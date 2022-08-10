import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";
import mongoose from "mongoose";
import { ConnectionOptions } from "tls";

const app = express();
const Port = 3001;
// parse application/json
app.use(bodyParser.json());

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// configure the app to enable cross origin resource sharing (cors)
app.use(cors());
// configure the app to use our routs
app.use("/api/v1", routes);

const MONGODB_CONNECTION_URL =
  "mongodb+srv://jomontjose:test1234@cluster0.y5jwwye.mongodb.net/absences_manager?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectionOptions)
  .then((res: any) => {
    app.listen(Port, () => {
      console.log(`Server is running on ${Port}`);
    });
  })
  .catch((error) => console.log(error.message));

mongoose.set("returnOriginal", false);
