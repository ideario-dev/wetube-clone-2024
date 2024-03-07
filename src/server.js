import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";

const app = express();
const PORT = 4000;
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use("/", globalRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);

const handleListening = () =>
  console.log(`Server Listening on port on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
