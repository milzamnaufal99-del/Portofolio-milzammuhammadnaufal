#!/usr/bin/env node
/**
 * Helper script to generate the og-image.png placeholder.
 * Run once: node assets/images/create_og_image.js
 * After running, delete this script.
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function uint32BE(n) {
  const buf = Buffer.alloc(4);
  buf.writeUInt32BE(n, 0);
  return buf;
}

function crc32(buf) {
  // Standard CRC32 used by PNG
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc & 1) ? (0xEDB88320 ^ (crc >>> 1)) : (crc >>> 1);
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function chunk(type, data) {
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crcVal = crc32(typeAndData);
  return Buffer.concat([uint32BE(data.length), typeAndData, uint32BE(crcVal)]);
}

function createPNG(width, height, r, g, b) {
  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 2;  // color type: RGB
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  // Raw image data: filter byte + RGB per pixel per row
  const row = Buffer.alloc(1 + width * 3);
  row[0] = 0; // filter type: None
  for (let x = 0; x < width; x++) {
    row[1 + x * 3] = r;
    row[2 + x * 3] = g;
    row[3 + x * 3] = b;
  }
  const raw = Buffer.concat(Array(height).fill(row));
  const compressed = zlib.deflateSync(raw);

  const ihdrChunk = chunk('IHDR', ihdr);
  const idatChunk = chunk('IDAT', compressed);
  const iendChunk = chunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

const outPath = path.join(__dirname, 'og-image.png');
const pngData = createPNG(1200, 630, 13, 13, 13); // #0d0d0d dark background
fs.writeFileSync(outPath, pngData);
console.log(`Created ${outPath} (1200x630 px, dark #0d0d0d placeholder)`);
