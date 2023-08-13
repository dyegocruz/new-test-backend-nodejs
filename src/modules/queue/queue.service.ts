import AWS from "aws-sdk";
import { SQS } from "@aws-sdk/client-sqs";
import envConfig from "../../config/env.config";
import { QueueMessageInterface } from "./queue.interface";

const awsRegion = envConfig.getString("AWS_REGION");
const awsAccountId = envConfig.getString("AWS_ACCOUNT_ID");
const awsQueueUrlBase = envConfig.getString("AWS_QUEUE_URL_BASE");
const queueName = envConfig.getString("AWS_QUEUE_NAME");

class QueueService {
  async sendMessage(message: QueueMessageInterface) {
    try {
      AWS.config.update({ region: awsRegion });

      const sqs = new SQS();

      await sqs.sendMessage({
        MessageBody: JSON.stringify(message),
        QueueUrl: `${awsQueueUrlBase}/${awsAccountId}/${queueName}`,
      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}

export default new QueueService();
