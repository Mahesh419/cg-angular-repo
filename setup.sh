#!/bin/sh
npm i
cat >.gitignore <<EOL
node_modules
config
EOL
cp './config/pre-commit' '.git/hooks'