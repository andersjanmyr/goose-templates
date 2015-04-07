#!/bin/bash

aws lambda invoke-async \
 --function-name processMetrics \
 --region eu-west-1 \
 --invoke-args ./kinesis-event.json \
 --debug 
