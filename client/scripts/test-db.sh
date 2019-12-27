#!/bin/bash

cd ../api
npm run seed
cd ../client
npx react-scripts test --watchAll=false