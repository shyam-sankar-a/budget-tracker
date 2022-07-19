import express from "express";
import fs from "fs";
//import userData from "../../data/users";

const userRouter = express.Router();
const data = {
  id: 1,
  name: "Shyam"
};
userRouter.get('/', (req, res) => {
  res.send(data);
});

export default userRouter;