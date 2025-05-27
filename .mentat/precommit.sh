#!/bin/bash
set -e

# Format Rust code
cargo fmt

# Run clippy checks
cargo clippy -- -D warnings

# Run tests to catch any breaking changes
# cargo test
