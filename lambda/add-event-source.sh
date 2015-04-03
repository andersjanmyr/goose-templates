
account='{{.ACCOUNT}}'
role="arn:aws:iam::$account:role/LambdaInvocation"
region='eu-west-1'
event_source=''

aws lambda add-event-source \
   --region $region \
   --function-name {{dromedarcase .NAME}} \
   --role $role \
   --event-source $event_source \
   --batch-size 100
