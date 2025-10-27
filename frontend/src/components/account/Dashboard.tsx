import { useSelector } from "react-redux";
import type { RootState } from "../../store/index";
import { type Organization } from "../../store/slices/organization";
import type { JSX } from "react";

const Dashboard = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);
  const corp = useSelector((state: RootState) => state.organization);

  return (
    <main>
      <h2 className="text-lg font-bold mb-2">Welcome, {user.title}!</h2>

      <h3>Here are your organizations:</h3>
      <ul className="list-disc ml-6">
        {user.organizations?.map((c: Organization) => {
          if (c._id == corp._id) return (
            <li key={c._id}><strong>Currently Playing:</strong> {c.title}</li>
          );
          else return (
            <li key={c._id}>{c.title}</li>
          );
        })}
      </ul>
    </main>
  )
};

export default Dashboard;