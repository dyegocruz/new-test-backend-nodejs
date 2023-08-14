import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import compression from "compression";
import appRoutes from "./routes";

const app: Express = express();

app.use(express.json());
app.use(helmet());
app.use(compression());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/", appRoutes);

export default app;
