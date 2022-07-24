## Descrição

Exemplo simples de como utilizar um "localstack" para simular e rodar a infraestrutura da AWS no ambiente LOCAL

## Comandos

```
docker compose up
# create the bucket
$ aws --endpoint-url=http://localhost:4572 s3 mb s3://local-aws-bucket
# list all buckets
$ aws --endpoint-url=http://localhost:4572 s3 ls
$ mkdir localAwsApp
$ cd $_
$ npm init -y
$ npm i aws-sdk
$ touch touch consumer.js publisher.js
# creating the queue
$ aws \
sqs create-queue \
--queue-name local-queue \
--endpoint-url http://localhost:4576
--region us-east-1 \
# should return
{
  "QueueUrl": "http://localhost:4576/queue/local-queue"
}
# creating the topic
$ aws \
sns create-topic \
--name local-topic \
--endpoint-url http://localhost:4575 \
--region us-east-1
# should return
{
  "TopicArn": "arn:aws:sns:us-east-1:123456789012:local-topic"
}
# create subscription
$ aws \
sns subscribe \
--notification-endpoint http://localhost:4576/queue/local-queue \
--topic-arn arn:aws:sns:us-east-1:123456789012:local-topic \
--protocol sqs \
--endpoint-url=http://localhost:4575 \
--region us-east-1
$ terraform init
# build infra with apply command
$ terraform apply --auto-approve
# when you're done, clean up after yourself
$ terraform destroy
```

## Referências.

Link: https://medium.com/@FloSloot/your-own-local-copy-of-aws-w-node-js-6d98a10533a8 ( código transcrito )
