import { user } from "./../model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { task } from "./../model/taskSchema.js";

// register

export const userReg = async (req, res) => {
  const { name, pwd, email } = req.body;

  if (!name || !pwd || !email) {
    return res.json({ success: false, error: "All fields are required" });
  }

  const currentReg = await user.findOne({ email: email });
  if (currentReg) {
    return res.json({
      success: false,
      error: "An account with this email already exists. Please Login.",
    });
  }
  const hashPwd = await bcrypt.hash(pwd, 10);

  await user.create({ name, password: hashPwd, email });

  res.json({
    success: true,
    msg: "Account created successfully. You can now sign in.",
    location: "/login",
  });
};

//login

export const userLog = async (req, res) => {
  const { pwd, email } = req.body;
  if (!pwd || !email) {
    return res.json({ success: false, error: "All fields are required" });
  }

  try {
    const currentLog = await user.findOne({ email });

    if (!currentLog) {
      return res.json({
        success: false,
        error: "No account found with this email. Please register first.",
      });
    }

    const matched = await bcrypt.compare(pwd, currentLog.password);
    if (!matched) {
      return res.json({
        success: false,
        error: "Incorrect password. Please try again.",
      });
    }

    const token = jwt.sign(
      { id: currentLog._id, email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return res.json({
      success: true,
      token,
      userName: currentLog.name,
      location: "/dashboard",
      msg: "Successfully Login",
    });
  } catch {
    return res.json({
      success: false,
      error: "Server not responding",
    });
  }
};

// dashboard

export const dashGet = (req, res) => {
  res.json({ success: true });
};

// Fetching the task

export const getTasks = async (req, res) => {
  try {
    const taskgt = await task.find({ userId: req.user.id });
    res.json({ success: true, msg: "Tasks fetched.", task: taskgt });
  } catch {
    res.json({ success: false, error: "DB not responding." });
  }
};

// creating the task

export const createTasks = async (req, res) => {
  const { title, description, status } = req.body;
  const Task = await task.create({
    title,
    description,
    userId: req.user.id,
    status,
  });
  res.json({
    success: true,
    msg: "Task Created Successfully",
    Task,
  });
};

// updating the task

export const updateTasks = async (req, res) => {
  const { taskId, title, description, status } = req.body;
  const updateFields = {};
  if (title) updateFields.title = title;
  if (description) updateFields.description = description;
  if (status) updateFields.status = status;
  try {
    const taskut = await task.findByIdAndUpdate(
      { _id: taskId },
      { $set: updateFields },
      { returnDocument: "after" },
    );
    res.json({
      success: true,
      msg: "Task Updated Successfully",
      task: taskut,
    });
  } catch {
    res.json({
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
    res.json({
      success: true,
      msg: "Task Deleted Successfully",
      task: taskdt,
    });
  } catch {
    res.json({
      success: false,
      error: "Server not Responding",
    });
  }
};
