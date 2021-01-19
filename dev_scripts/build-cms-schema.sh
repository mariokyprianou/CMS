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
# TOKEN=$($(dirname $0)/generate-token.sh $AWS_REGION)
AUTHORIZATION="'Authorization=Bearer eyJraWQiOiJPUnpsQUt6aDBHWkUweDAwbFJickI5ejBJZDBNbjZPUDgrUWhVRkswV0p3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmZDkwMGY0OS1jZGVkLTQzMGEtYjM3Ni0xZjRiOGFmMGM1ZjEiLCJhdWQiOiJ1OTBucXZ1bGpraWttNGI2Z2FnOWxsZWEiLCJldmVudF9pZCI6IjZhZGM5ZDJmLTZmZTUtNDJkNy04M2FkLTg1NWYwMGEwZmZlMyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjExMDUwMzMxLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX0pTWHdTOWFtRyIsImNvZ25pdG86dXNlcm5hbWUiOiJmZDkwMGY0OS1jZGVkLTQzMGEtYjM3Ni0xZjRiOGFmMGM1ZjEiLCJleHAiOjE2MTEwNzA1NzIsImlhdCI6MTYxMTA2Njk3MiwiZW1haWwiOiJqZXNzaWNhLm1vd2F0dEB0aGVkaXN0YW5jZS5jby51ayJ9.DGoaUWtGRGeBHNOr1ArF1l_qXwfP75ccQ1nXtOtzC24W20lvLXScabJKIpv7vg1UUxFYgkDgeW15yMosvMQi4WIeSHl3q0P05EU0DMFYa0EA1NeUfEMq3tzmr5yLDU7T_4YuonXBpZrSvE7_g-HSoHZ0QNOeVwleDrRD-uEQpuC2U01vI9zpdbHK1_2boqdxo-7ZSF-QHKcr2bmmqzUxqipErterk6TdDy84PWINTkcgyf_dNV6BL-Gq91K46Hh9T2WaYG0RPm5JUvGhl_4VUxG7aNQEIoGeLJxfbAhVb2j7KBnoTaW9pbFQoG0OnlJZawwqUrHTMwncKrna89q2tA'"
eval npx get-graphql-schema -j --header $AUTHORIZATION $GRAPHQL_URI > ./src/DataProvider/schema.json