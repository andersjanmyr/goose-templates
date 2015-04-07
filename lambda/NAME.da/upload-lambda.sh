#!/bin/bash
#
# upload-lambda.sh
# Zip and upload lambda function
#

program=`basename $0`

set -o errexit

function usage() {
  echo "Usage: $program <function.js>"
}

if [ $# -lt 1 ]
then
  echo 'Missing required parameters'
  usage
  exit 1
fi

file='./{{dasherized .NAME}}.js'
zip='./{{dasherized .NAME}}.zip'
func='{{dromedarcase .NAME}}'

account='{{.ACCOUNT}}'
s3_role="arn:aws:iam::$account:role/S3LambdaInvocaRole"
kinesis_role="arn:aws:iam::$account:role/KinesisLambdaInvocaRole"
region='eu-west-1'

zip_package() {
  zip -r $zip $file lib node_modules
}

upload_package() {
  aws lambda upload-function \
     --region $region \
     --role $s3_role\
     --function-name $func  \
     --function-zip $zip \
     --mode event \
     --handler ${func}.handler \
     --runtime nodejs \
     --debug \
     --timeout 10 \
     --memory-size 128
}

# main
zip_package
upload_package
