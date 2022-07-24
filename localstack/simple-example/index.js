const AWS = require("aws-sdk");

const HOST_WINDOWS = process.env.LOCALSTACK_HOSTNAME; //Responsável por pegar o localhost do contêiner do Docker para o Windows
const HOST_MACOS = "host.docker.internal"; //Responsável por pegar o localhost do contêiner do Docker para o Macos

//Alterar o host baseando no seu sistema operacional
const endpoint = new AWS.Endpoint(`http://${HOST_MACOS}:4566`);

//Colocar suas credenciais configuradas no aws configure --profile testelocal
AWS.config.update({
  accessKeyId: "123",
  secretAccessKey: "123",
  endpoint,
  s3ForcePathStyle: true,
  region: "sa-east-1",
});

const s3 = new AWS.S3();
const sqs = new AWS.SQS({ endpoint });
//Alterar o host baseando no seu sistema operacional
const queueURL = `http://${HOST_MACOS}:4566/000000000000/consolidar-pedido-emprestimo`;

exports.handler = async (event, context) => {
  try {
    console.log("Pedido de empréstimo solicitado");

    const srcBucket = event.Records[0].s3.bucket.name;
    const srcKey = decodeURIComponent(
      event.Records[0].s3.object.key.replace(/\+/g, " ")
    );

    const bucketInfo = { srcBucket, srcKey };

    console.log("Informações do pedido armazenado", JSON.stringify(bucketInfo));

    const mensagem = {
      MessageBody: JSON.stringify(bucketInfo),
      QueueUrl: queueURL,
    };

    let mensagemEnviada = await sqs.sendMessage(mensagem).promise();
    console.log("Mensagem enviada", mensagemEnviada);

    return JSON.stringify(mensagemEnviada);
  } catch (error) {
    console.log(
      "Ocorreu uma falha ao processar a solicitação do pedido de empréstimo ",
      error
    );
  }
};
