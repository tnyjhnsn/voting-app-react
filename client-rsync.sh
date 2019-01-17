#!/bin/bash
cd client && yarn run build
cd .. && rsync -avz --delete-after client/build tony@stratus:/var/www/tosp/fcc/node/voting-app-react/client
