import express from "express";
import cors from "cors";
import rootRouter from "./routes/root.router.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(rootRouter);

app.listen(3069, () => {
  console.log(`server is open at http://localhost:3069`);
});
