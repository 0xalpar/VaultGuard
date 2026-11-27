FROM node:22-bookworm
ARG RUST_VERSION=1.89.0
ARG SOLANA_VERSION=2.3.0
ARG ANCHOR_VERSION=0.32.1
ENV RUSTUP_HOME=/root/.rustup \
    CARGO_HOME=/root/.cargo
ENV PATH=/root/.cargo/bin:/root/.local/share/solana/install/active_release/bin:$PATH
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates curl git build-essential pkg-config libssl-dev libudev-dev \
    clang libclang-dev cmake protobuf-compiler libusb-1.0-0-dev zlib1g-dev \
    libzstd-dev bzip2 xz-utils python3 && rm -rf /var/lib/apt/lists/*
RUN curl --proto '=https' --tlsv1.2 -fsSL https://sh.rustup.rs -o /tmp/rustup.sh \
    && sh /tmp/rustup.sh -y --profile minimal --default-toolchain "$RUST_VERSION" \
    && rm /tmp/rustup.sh
RUN curl -fsSL "https://release.anza.xyz/v${SOLANA_VERSION}/install" -o /tmp/solana-install.sh \
    && sh /tmp/solana-install.sh && rm /tmp/solana-install.sh \
    && solana --version && solana-test-validator --version
RUN cargo install --locked --git https://github.com/coral-xyz/anchor --tag "v${ANCHOR_VERSION}" anchor-cli \
    && anchor --version && rustc --version && node --version
WORKDIR /workspace
CMD ["sleep", "infinity"]
