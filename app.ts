import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import mongoose, { type ConnectOptions } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import routeRouter from "./routes/route";
import { handleError } from "./utils/errorHandler";
import { type CustomError } from "./interfaces/utils";

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 9000;

app.use(express.json());
app.use("/", routeRouter);
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  handleError(err, res);
});

const triggerServer = async () => {
  await mongoose.connect(process.env.DB_CONNECTION_STRING || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);

  app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
  });
  console.log("DB Connected Successfully");
};
triggerServer();
