import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const docClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "ProductsTable";

export const createProduct = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const reqBody = JSON.parse(event.body as string);
  const product = {
    ...reqBody,
    productID: uuidv4(),
  };
  await docClient
    .put({
      TableName: TABLE_NAME,
      Item: product,
    })
    .promise();
  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};

export const getProduct = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;

  const output = await docClient
    .get({
      TableName: TABLE_NAME,
      Key: {
        productID: id,
      },
    })
    .promise();

  if (!output.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "not found" }),
    };
  }
  return {
    statusCode: 2000,
    body: JSON.stringify(output.Item),
  };
};
