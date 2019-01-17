#!/bin/bash
rsync -avz --delete-after server tony@stratus:/var/www/tosp/fcc/node/voting-app-react
