#!/bin/bash
cd client && yarn run build
cd .. && rsync -avz --delete-after client/build root@stratus:/var/www/tosp/fcc/node/voting-app-react/client
