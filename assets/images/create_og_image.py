#!/usr/bin/env python3
"""
Helper script to generate the og-image.png placeholder.
Run this once: python3 assets/images/create_og_image.py
After running, delete this script.
"""
import struct
import zlib
import os

def write_chunk(name, data):
    """Write a PNG chunk with CRC."""
    chunk_data = name + data
    crc = zlib.crc32(chunk_data) & 0xFFFFFFFF
    return struct.pack('>I', len(data)) + chunk_data + struct.pack('>I', crc)

def create_placeholder_png(width, height, r, g, b, filepath):
    """Create a minimal valid PNG with a solid color fill."""
    # PNG signature
    sig = b'\x89PNG\r\n\x1a\n'

    # IHDR: width, height, bit depth=8, color type=2 (RGB), compress=0, filter=0, interlace=0
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    ihdr = write_chunk(b'IHDR', ihdr_data)

    # Build raw scanlines: filter byte 0 + RGB per pixel
    row = bytes([0] + [r, g, b] * width)
    raw = row * height
    compressed = zlib.compress(raw, 9)
    idat = write_chunk(b'IDAT', compressed)

    # IEND
    iend = write_chunk(b'IEND', b'')

    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'wb') as f:
        f.write(sig + ihdr + idat + iend)

    print(f"Created {filepath} ({width}x{height} px)")

if __name__ == '__main__':
    script_dir = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.join(script_dir, 'og-image.png')
    # Dark background matching portfolio theme (#0d0d0d)
    create_placeholder_png(1200, 630, 13, 13, 13, out_path)
