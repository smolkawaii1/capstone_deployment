import express from "express";
import {
  createProject,
  deleteProject,
  updateProject,
  getAllProjectDetail,
  getAllProjects,
} from "../controllers/project.controller.js";

const router = express.Router();

router.route("/").get(getAllProjects);
router.route("/:id").get(getAllProjectDetail);
router.route("/").post(createProject);
router.route("/:id").patch(updateProject);
router.route("/:id").delete(deleteProject);

export default router;
