import { Router } from "express";

import {
  deleteGoal,
  getGoals,
  putGoal,
  setGoal,
} from "../controllers/goalController.mjs";

const router = Router();

router.route("/").get(getGoals).post(setGoal);
router.route("/:id").put(putGoal).delete(deleteGoal);

export default router;
