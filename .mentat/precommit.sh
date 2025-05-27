#!/bin/bash
set -e

# Format Rust code (only if Rust toolchain is already installed)
if command -v cargo &> /dev/null; then
    cargo fmt
fi
