import dotenv from "dotenv";

class Config {
  constructor() {
    dotenv.config();
  }

  getString(value: string): string {
    return process.env[value] as string;
  }
}

export default new Config();
