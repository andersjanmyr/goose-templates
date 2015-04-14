#!/bin/bash
#
# upload-lambda.sh
# Zip and upload lambda function
#

program=`basename $0`

set -o errexit

cmd=${1:-upload}

file='./{{dromedarcase .NAME}}.js'
zip='./{{dromedarcase .NAME}}.zip'
func='{{dromedarcase .NAME}}'

account='{{.ACCOUNT}}'
execute_role="arn:aws:iam::$account:role/LambdaExecuteRole"
region='eu-west-1'

zip_package() {
  zip -r $zip $file lib node_modules
}

create_function() {
  aws lambda create-function \
     --region $region \
     --role $execute_role\
     --runtime nodejs \
     --function-name $func  \
     --handler ${func}.handler \
     --timeout 10 \
     --memory-size 128 \
     --zip-file fileb://$zip
}


update_function() {
  aws lambda update-function-code \
     --region $region \
     --function-name $func  \
     --zip-file fileb://$zip
}

# main
zip_package
if [[ "$cmd" == "create" ]]; then
  create_function
else
  update_function
fi
