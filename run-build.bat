@echo off
cd "c:\PixelFactory\Website Factory Renew\last git update\website-factory-rebranding"
pnpm run build > build-log.txt 2>&1
type build-log.txt
