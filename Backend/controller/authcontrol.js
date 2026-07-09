import { user } from "./../model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { task } from "./../model/taskSchema.js";

// register
export const userReg = async (req, res) => {
  const { name, pwd, email } = req.body;

  if (!name || !pwd || !email) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required" });
  }
  try {
    const currentReg = await user.findOne({ email: email });
    if (currentReg) {
      return res.status(409).json({
        success: false,
        error: "An account with this email already exists. Please Login.",
      });
    }

    const hashPwd = await bcrypt.hash(pwd, 10);
    await user.create({ name, password: hashPwd, email });

    res.status(201).json({
      success: true,
      msg: "Account created successfully. You can now sign in.",
      location: "/login",
    });
  } catch {
    return res.status(500).json({
      success: false,
      error: "Server not responding",
    });
  }
};

// login
export const userLog = async (req, res) => {
  const { pwd, email } = req.body;
  if (!pwd || !email) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required" });
  }

  try {
    const currentLog = await user.findOne({ email });

    if (!currentLog) {
      return res.status(404).json({
        success: false,
        error: "No account found with this email. Please register first.",
      });
    }

    const matched = await bcrypt.compare(pwd, currentLog.password);
    if (!matched) {
      return res.status(401).json({
        success: false,
        error: "Incorrect password. Please try again.",
      });
    }

    const token = jwt.sign(
      { id: currentLog._id, email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return res.status(200).json({
      success: true,
      token,
      userName: currentLog.name,
      location: "/dashboard",
      msg: "Successfully Login",
    });
  } catch {
    return res.status(500).json({
      success: false,
      error: "Server not responding",
    });
  }
};

// dashboard
export const dashGet = (req, res) => {
  res.status(200).json({ success: true });
};

// Fetching the task
export const getTasks = async (req, res) => {
  try {
    const taskgt = await task.find({ userId: req.user.id });
    res
      .status(200)
      .json({ success: true, msg: "Tasks fetched.", task: taskgt });
  } catch {
    res.status(500).json({ success: false, error: "DB not responding." });
  }
};

// creating the task
export const createTasks = async (req, res) => {
  const { title, description, status, points } = req.body;
  try {
    const Task = await task.create({
      title,
      description,
      userId: req.user.id,
      status,
      points,
    });
    res.status(201).json({
      success: true,
      msg: "Task Created Successfully",
      Task,
    });
  } catch (err) {
    console.error("createTasks error:", err);
    res.status(500).json({
      success: false,
      error: "Server not Responding",
    });
  }
};

// updating the task
export const updateTasks = async (req, res) => {
  const { taskId, title, description, status, points } = req.body;
  const updateFields = {};
  if (title) updateFields.title = title;
  if (description) updateFields.description = description;
  if (status) updateFields.status = status;
  if (points) updateFields.points = points;

  try {
    const taskut = await task.findByIdAndUpdate(
      { _id: taskId },
      { $set: updateFields },
      { returnDocument: "after" },
    );
    res.status(200).json({
      success: true,
      msg: "Task Updated Successfully",
      task: taskut,
    });
  } catch (err) {
    console.error("updateTasks error:", err);
    res.status(500).json({
      success: false,
      error: "Server not Responding",
    });
  }
};

// deleting the task
export const deleteTasks = async (req, res) => {
  const { taskId } = req.body;
  try {
    const taskdt = await task.deleteOne({ _id: taskId });
    res.status(200).json({
      success: true,
      msg: "Task Deleted Successfully",
      task: taskdt,
    });
  } catch (err) {
    console.error("deleteTasks error:", err);
    res.status(500).json({
      success: false,
      error: "Server not Responding",
    });
  }
};
