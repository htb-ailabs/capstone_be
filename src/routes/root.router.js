import express from "express";

const rootRouter = express.Router();

rootRouter.get(`/`, (req, res, next) => {
  res.json(`connection is OK`);
  next();
});

export default rootRouter;
