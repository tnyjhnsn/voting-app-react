#!/bin/bash
rsync -avz --delete-after server root@stratus:/var/www/tosp/fcc/node/voting-app-react
