#
# Jira Ticket: 
# Created Date: Wed, 21st Aug 2019, 10:58:17 am
# Author: Jessica Mowatt
# Email: jessica.mowatt@thedistance.co.uk
# Copyright (c) 2019 The Distance
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

DIR=$(dirname $0)
AWS_REGION=$(read_var REACT_APP_AWS_REGION .env)
GRAPHQL_URI="'$(read_var REACT_APP_GRAPHQL_URI .env)'"
TOKEN=$($(dirname $0)/generate-token.sh $AWS_REGION)
AUTHORIZATION="'Authorization=Bearer $TOKEN'"
eval npx get-graphql-schema -j --header $AUTHORIZATION $GRAPHQL_URI > ./src/DataProvider/schema.json