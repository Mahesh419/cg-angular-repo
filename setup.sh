#!/bin/sh
npm i
mv './config/pre-commit' '.git/hooks'
cat >.gitignore <<EOL
node_modules
config
EOL