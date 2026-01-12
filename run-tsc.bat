@echo off
cd "c:\PixelFactory\Website Factory Renew\last git update\website-factory-rebranding"
pnpm exec tsc --noEmit --pretty false > tsc-output.txt 2>&1
type tsc-output.txt
