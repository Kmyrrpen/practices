const { Router } = require("express");
const {
  deleteGoal,
  getGoals,
  putGoal,
  setGoal,
} = require("../controllers/goalController.js");

const router = Router();

router.route("/").get(getGoals).post(setGoal);
router.route("/:id").put(putGoal).delete(deleteGoal);

module.exports = router;
