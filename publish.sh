#!/bin/bash
rm -r ../app/build
pm2 stop all
npm run build
pm2 start all
cp -r build ../app/build

