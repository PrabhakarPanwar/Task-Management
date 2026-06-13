import express from "express";
import {
  userLog,
  userReg,
  dashGet,
  getTasks,
  createTasks,
  updateTasks,
  deleteTasks,
} from "../controller/authcontrol.js";
import verify from "../middleware/verify.js";

const homeRouter = express.Router();

//  Register

homeRouter.post("/api/register", userReg);

// Login

homeRouter.post("/api/login", userLog);

//Dashboard Verify

homeRouter.get("/api/dashboard", verify, dashGet);

//Task

homeRouter.get("/api/tasks", verify, getTasks);
homeRouter.post("/api/tasks", verify, createTasks);
homeRouter.put("/api/tasks", verify, updateTasks);
homeRouter.delete("/api/tasks", verify, deleteTasks);

export default homeRouter;
