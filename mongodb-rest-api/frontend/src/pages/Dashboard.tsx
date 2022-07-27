import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import { getGoals, reset } from "@/features/goals/goalSlice";
import GoalForm from "@/components/GoalForm";
import GoalItem from "@/components/GoalItem";
import Spinner from "@/components/Spinner";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useAppSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (isError) {
      toast(message);
    } else {
      dispatch(getGoals());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
