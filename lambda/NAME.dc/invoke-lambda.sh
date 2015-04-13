#!/bin/bash
region='eu-west-1'

aws lambda invoke \
 --function-name {{dromedarcase .NAME}} \
 --region $region \
 --payload fileb://event.json \
 --log-type Tail \
 context.out | jq .LogResult | tr -d \" | base64 --decode
