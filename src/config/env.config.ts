import dotenv from "dotenv";

class Config {
  constructor() {
    dotenv.config();
  }

  getString(value: string): string {
    return process.env[value] as string;
  }

  getQueueUrl(): string {
    return `${this.getString("AWS_QUEUE_URL_BASE")}/${this.getString(
      "AWS_ACCOUNT_ID",
    )}/${this.getString("AWS_QUEUE_NAME")}`;
  }
}

export default new Config();
