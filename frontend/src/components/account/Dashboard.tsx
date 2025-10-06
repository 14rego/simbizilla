import { useSelector } from "react-redux";
import type { RootState } from "../../store/index";
import type { JSX } from "react";

const Dashboard = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);
  const corp = useSelector((state: RootState) => state.corporation);

  return (
    <main>
      <pre>{JSON.stringify(user)}</pre>
      <pre>{JSON.stringify(corp)}</pre>
    </main>
  )
};

export default Dashboard;