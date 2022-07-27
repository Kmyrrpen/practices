import axios from "axios";
import { Goal } from "./goalSlice";

const API_URL = "/api/goals";

const createConfig = (token: string) => ({
  headers: { Authorization: "Bearer " + token },
});

const getGoals = async (token: string) => {
  const response = await axios.get(API_URL, createConfig(token));
  return response.data;
};

const createGoal = async (token: string, goal: Partial<Goal>) => {
  const response = await axios.post(API_URL, goal, createConfig(token));
  return response.data;
};

const editGoal = async (token: string, goal: Goal) => {
  const response = await axios.put(
    `${API_URL}/${goal._id}`,
    goal,
    createConfig(token)
  );
  return response.data;
};

const deleteGoal = async (token: string, goal: Goal) => {
  const response = await axios.delete(
    `${API_URL}/${goal._id}`,
    createConfig(token)
  );
  return response.data;
};

const goalService = { createGoal, getGoals, editGoal, deleteGoal };
export default goalService;
