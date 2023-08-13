import AWS from "aws-sdk";
import { Message, SQS } from "@aws-sdk/client-sqs";
import { Consumer } from "sqs-consumer";
import envConfig from "../config/env.config";

AWS.config.update({ region: envConfig.getString("AWS_REGION") });

interface ConsumerInterface {
  queueUrl: string;
  batchSize: number;
  handler: (messages: Message[]) => Promise<void | Message[]>;
}

export const createConsumer = ({
  queueUrl,
  batchSize,
  handler,
}: ConsumerInterface) => {
  try {
    return Consumer.create({
      queueUrl,
      batchSize,
      handleMessageBatch: handler,
      sqs: new SQS(),
    });
  } catch (err: any) {
    throw new Error(err.message);
  }
};
