const AWS = require('aws-sdk')

const SQS = new AWS.SQS()

async function  subMessage() {
        const message = await SQS.receiveMessage(
            {
                QueueUrl: `${process.env.AWS_QUEUE_URL}`,
                AttributeNames: ['All'],
                WaitTimeSeconds:10,
                VisibilityTimeout: 10
            }
        ).promise()

        !message  && await SQS.deleteMessage({
            QueueUrl: `${process.env.AWS_QUEUE_URL}`,
            ReceiptHandle: message.Messages[0].ReceiptHandle
        }).promise()
}

module.exports = {
    subMessage
}