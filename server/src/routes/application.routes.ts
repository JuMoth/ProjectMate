import { Router } from "express";

import {
    createApplicationController,
    getMyApplicationController,
} from "../controllers/application.controller";

const router = Router();

// 내 참여 신청 조회
router.get("/:id/applications/me", getMyApplicationController);

// 프로젝트 참여 신청
router.post("/:id/applications", createApplicationController);

export default router;