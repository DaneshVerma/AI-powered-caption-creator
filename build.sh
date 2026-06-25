#!/bin/bash
set -e

echo "Building React app..."

cd client
npm install
npm run build

echo "Copying build to FastAPI..."

rm -rf ../server/public
mkdir -p ../server/public

cp -r dist/assets ../server/public/
cp dist/index.html ../server/public/

echo "Installing uv..."

python -m pip install --upgrade pip
pip install uv

echo "Installing Python dependencies..."

cd ../server
uv sync --frozen --active