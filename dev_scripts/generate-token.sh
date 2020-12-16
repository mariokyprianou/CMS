#!/bin/bash
echo ${2}
PAYLOAD=$(aws cognito-idp --region ${1:-ap-south-1} initiate-auth --cli-input-json ${2:-'file://dev_scripts/auth-initiate.json'} | jq '.AuthenticationResult.IdToken')
echo ${PAYLOAD//\"}