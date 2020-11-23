#
# Jira Ticket: 
# Created Date: Mon, 20th Jan 2020, 10:35:42 am
# Author: Jessica Mowatt
# Email: jessica.mowatt@thedistance.co.uk
# Copyright (c) 2020 The Distance
#
#!/bin/bash
set -a
source .env
set +a

function read_var() {
    VAR=$(grep $1 $2 | xargs)
    IFS="=" read -ra VAR <<< "$VAR"
    echo ${VAR[1]}
}

GRAPHQL_URI=$(read_var REACT_APP_GRAPHQL_URI .env)
TOKEN=$($(dirname $0)/generate-token.sh eu-west-2)
eval node $(dirname $0)/fragmentBuilder.js $GRAPHQL_URI $TOKEN