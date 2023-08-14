import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import compression from "compression";
import envConfig from "./config/env.config";
import connectDB from "./config/db.config";
import appRoutes from "./routes";
import { createConsumer } from "./consumer/catalog.consumer";
import generateCatalogJsonHandler from "./consumer/handler/generate-catalog-handler";

const createServer = () => {
  const app: Express = express();
  const port = envConfig.getString("PORT") || 3000;

  connectDB();

  app.use(express.json());
  app.use(helmet());
  app.use(compression());

  app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });

  app.use("/", appRoutes);

  const consumer = createConsumer({
    queueUrl: envConfig.getQueueUrl(),
    batchSize: 10,
    handler: generateCatalogJsonHandler,
  });

  consumer.start();

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
  return app;
};

export default createServer();
