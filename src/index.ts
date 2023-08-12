import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import compression from "compression";
import envConfig from "./config/env.config";
import connectDB from "./config/db.config";
import appRoutes from "./routes";

const app: Express = express();
const port = envConfig.getString("PORT");

connectDB();

app.use(express.json());
app.use(helmet());
app.use(compression());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/", appRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
