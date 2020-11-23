#!/bin/bash

# AWS Amplify build variables 
sed "s/process.env.AWS_BRANCH/'$AWS_BRANCH'/g; s/process.env.AWS_COMMIT_ID/'$AWS_COMMIT_ID'/g" src/App.js > src/.App.js.tmp
mv -f src/.App.js.tmp src/App.js