#!/bin/bash
region='eu-west-1'

aws lambda invoke-async \
 --function-name {{dromedarcase .NAME}} \
 --region $region \
 --invoke-args ./kinesis-event.json \
 --debug
