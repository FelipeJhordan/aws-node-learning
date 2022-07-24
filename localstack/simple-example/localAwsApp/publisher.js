const AWS = require('aws-sdk')
const {promisify} = require('util')

AWS.config.update({ region: 'us-east-1'})

const sns = new AWS.SNS({endpoint: 'http://localhost:4575'})

sns.publish = promisify(sns.publish)

const TopicArn = ''

async function publish(msg) {
    const publishParams = {
        TopicArn,
        Message: msg
    }

    let topicRes

    try {
        topicRes = await sns.publish(publishParams)
    } catch(e) {
        topicRes = e
    }
    console.log('Topic Response', topicRes)
}

for(let i= 0; i< 5; i++) {
    publish('message  #', +1)
}
