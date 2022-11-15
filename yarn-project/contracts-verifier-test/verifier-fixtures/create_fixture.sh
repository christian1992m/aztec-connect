#!/bin/bash
set -e

cd ../../../barretenberg
if [ -d "./src" ]; then
  mkdir -p build && cd build && rm -rf ./data && cmake .. && make -j$(nproc) tx_factory rollup_cli && cd ..
fi
cd srs_db && ./download_ignition.sh 1
cd ../../yarn-project/contracts-verifier-test/verifier-fixtures

# input format: num_txs | inner size | outer size | is mock
./create_rollup_proof.sh 4 3 2 true
./create_rollup_proof.sh 1 1 1 false

cd .. && rm -rf dest .tsbuildinfo && yarn build
cd verifier-fixtures && yarn ts-node ../dest/index.js
cd .. && rm -rf dest .tsbuildinfo 