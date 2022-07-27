const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const Goal = require("../models/goalModel");

/**
 * @desc Get Goals
 * @route GET /api/goals
 * @access Private
 */
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user._id });
  res.status(200).json(goals);
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

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user._id,
  });

  res.status(201).json(goal);
});

/**
 * @desc Delete Goal
 * @route DELETE /api/goals/:id
 * @access Private
 */
const deleteGoal = asyncHandler(async (req, res) => {
 
  // check if ID from params are valid
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Goal not Found");
  }

  const goal = await Goal.findById(req.params.id);

  // check if goal exists
  if (!goal) {
    res.status(400);
    throw new Error("Goal not Found!");
  }

  // check if goal is owned by the current user
  if (!goal.user.toString() === req.user._id) {
    res.status(401);
    throw new Error("Unauthorized access");
  }

  await goal.remove();
  res.status(200).json({ id: req.params.id });
});

/**
 * @desc Put Goal
 * @route PUT /api/goals/:id
 * @access Private
 */
const putGoal = asyncHandler(async (req, res) => {

  // check if payload is valid
  if (!req.body.text) {
    res.status(400);
    throw new Error("Invalid Body");
  }

  // check if ID from params are valid
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Goal not Found");
  }

  const goal = await Goal.findById(req.params.id);

  // check if goal exists
  if (!goal) {
    res.status(400);
    throw new Error("Goal not Found!");
  }

  // check if goal is owned by the current user
  if (!goal.user.toString() === req.user._id) {
    res.status(401);
    throw new Error("Unauthorized access");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(201).json(updatedGoal);
});

module.exports = {
  getGoals,
  setGoal,
  deleteGoal,
  putGoal,
};
