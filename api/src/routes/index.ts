import * as express from "express";
import userRouter from "./users";

const router: express.Router = express.Router();

router.use("/users", userRouter);

export default router;
