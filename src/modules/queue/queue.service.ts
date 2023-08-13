import AWS from "aws-sdk";
import { SQS } from "@aws-sdk/client-sqs";
import envConfig from "../../config/env.config";
import { QueueMessageInterface } from "./queue.interface";

const awsRegion = envConfig.getString("AWS_REGION");

class QueueService {
  async sendMessage(message: QueueMessageInterface) {
    try {
      AWS.config.update({ region: awsRegion });

      const sqs = new SQS();

      await sqs.sendMessage({
        MessageBody: JSON.stringify(message),
        QueueUrl: envConfig.getQueueUrl(),
      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}

export default new QueueService();
