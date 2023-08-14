import app from "./app";
import { connectDB } from "./config/db.config";
import envConfig from "./config/env.config";
import { createConsumer } from "./consumer/catalog.consumer";
import generateCatalogJsonHandler from "./consumer/handler/generate-catalog-handler";

const port = envConfig.getString("PORT") || 3000;

const start = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });

  const consumer = createConsumer({
    queueUrl: envConfig.getQueueUrl(),
    batchSize: 10,
    handler: generateCatalogJsonHandler,
  });

  consumer.start();
};

start();
