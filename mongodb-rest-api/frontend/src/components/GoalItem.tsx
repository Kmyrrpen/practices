import { useAppDispatch } from "@/app/hooks";
import { deleteGoal, Goal } from "@/features/goals/goalSlice";

type Props = {
  goal: Goal;
};

const GoalItem: React.FC<Props> = ({ goal }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <h2>{goal.text}</h2>
      <button onClick={() => dispatch(deleteGoal(goal))} className="close">
        X
      </button>
    </div>
  );
};

export default GoalItem;
