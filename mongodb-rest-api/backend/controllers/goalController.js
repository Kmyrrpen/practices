const asyncHandler = require("express-async-handler");

/**
 * @desc Get Goals
 * @route GET /api/goals
 * @access Private
 */
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get Goals" });
});

/**
 * @desc Set Goal
 * @route POST /api/goals
 * @access Private
 */
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Invalid Body");
  }

  res.status(201).json({ message: "set: GOAL" });
});

/**
 * @desc Delete Goal
 * @route DELETE /api/goals/:id
 * @access Private
 */
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `delete: GOAL ${req.params.id}` });
});

/**
 * @desc Put Goal
 * @route PUT /api/goals/:id
 * @access Private
 */
const putGoal = asyncHandler(async (req, res) => {
  res.status(201).json({ message: `put: GOAL ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoal,
  deleteGoal,
  putGoal,
};
