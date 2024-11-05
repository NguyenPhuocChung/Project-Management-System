const express = require("express");
const { createMeeting } = require("../controllers/meetingController");
const {
  addProject,
  findProject,
  deleteProjectById,
  updateProjectById,
  findProjectById,
  getProjectsByInvite,
  updateProjectStatus,
  getStatusSummary,
} = require("../controllers/projectController");
const {
  addTask,
  findAllTasks,
  deleteTasksById,
  updateTasksById,
  findAllTasksById,
  findAllTasksByProjectId,
  getTasksByInvite,
  updateTaskStatus,
  getTaskStatusSummary,
} = require("../controllers/taskController");
const {
  login,
  register,
  checkPassword,
  otpPassword,
  verifyAndUpdatePassword,
  checkEmailExists,
  isAuthenticated,
} = require("../controllers/authController");
const {
  calendaring,
  addCalendaring,
  updateCalendaring,
  deleteCalendaring,
  getAllCalendaring,
} = require("../controllers/calenderingController");
const {
  findAccountsById,
  updateAccountsById,
  findAccounts,
  uploadAvatar,
  findAccountsByRole,
  deleteAccountById,
} = require("../controllers/accountController");
const {
  getCommentsByTask,
  addComment,
} = require("../controllers/commentController");

const app = express();
const router = express.Router();

// Authentication Routes
router.post("/login", login);
router.post("/register", register);

// Meeting Routes
router.post("/create", isAuthenticated, createMeeting);

// Task Routes
router.post("/addTask", isAuthenticated, addTask);
router.get("/tasks", isAuthenticated, findAllTasks);
router.get("/taskById/:id", isAuthenticated, findAllTasksById);
router.get(
  "/taskByIdProject/:projectId",
  isAuthenticated,
  findAllTasksByProjectId
);
router.get("/tasksByInvite/:inviteId", isAuthenticated, getTasksByInvite);
router.put("/task/:id/status", isAuthenticated, updateTaskStatus);
router.delete("/deleteTask/:id", isAuthenticated, deleteTasksById);
router.put("/updateTask/:id", isAuthenticated, updateTasksById);
router.get("/task/status-summary", isAuthenticated, getTaskStatusSummary);

// Project Routes
router.post("/addProject", isAuthenticated, addProject);
router.delete("/deleteProject/:id", isAuthenticated, deleteProjectById);
router.put("/updateProject/:id", isAuthenticated, updateProjectById);
router.get("/projectsByInvite/:inviteId", isAuthenticated, getProjectsByInvite);
router.put("/project/:id/status", isAuthenticated, updateProjectStatus);
router.get("/project/status-summary", isAuthenticated, getStatusSummary);

// Calendaring Routes
router.get("/calendering/:date", isAuthenticated, calendaring);
router.get("/getAllCalendering", isAuthenticated, getAllCalendaring);
router.post("/addCalendaring", isAuthenticated, addCalendaring);
router.delete("/deleteCalendaring/:id", isAuthenticated, deleteCalendaring);
router.put("/updateCalendaring/:id", isAuthenticated, updateCalendaring);

// Account Routes
router.get("/projects", isAuthenticated, findProject);
router.get("/projectsById/:id", isAuthenticated, findProjectById);
router.get("/invitemember/:userRole", isAuthenticated, findAccountsByRole);
router.get("/account/:id", isAuthenticated, findAccountsById);
router.get("/allaccount", isAuthenticated, findAccounts);
router.put("/upload/:id", isAuthenticated, uploadAvatar);
router.delete("/deleteAccount/:id", isAuthenticated, deleteAccountById);
router.put("/account/:id", isAuthenticated, updateAccountsById);
router.post("/checkPassword/:id", isAuthenticated, checkPassword);
router.post("/sendOTP", isAuthenticated, otpPassword);
router.post("/verifyOtp", isAuthenticated, verifyAndUpdatePassword);
router.post("/checkEmail", isAuthenticated, checkEmailExists);

// Comment Routes
router.get("/comment/:idTask", isAuthenticated, getCommentsByTask);
router.post("/addComment", isAuthenticated, addComment);

module.exports = router;
