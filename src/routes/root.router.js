import express from "express";
import authRouter from "./auth.router.js";
import imageRouter from "./image.router.js";
import commentRouter from "./comment.router.js";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/image", imageRouter);
rootRouter.use(`/comment`, commentRouter);

rootRouter.get(`/`, (req, res, next) => {
  res.json(`connection is OK`);
  next();
});

export default rootRouter;
