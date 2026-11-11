import { Router } from "express";
import { getProjectsController, getProjectController } from "../controllers/project.controller";

const router = Router();

router.get("/", getProjectsController);
router.get("/:id", getProjectController);

export default router;