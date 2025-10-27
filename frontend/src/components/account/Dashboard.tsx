import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/index";
import { setOrganization, type Organization } from "../../store/slices/organization";
import type { JSX } from "react";
import { Link } from "react-router-dom";
import { apiPost } from "../../features/form/helpers";
import { djsIncrement, setFormMessages, setIsAuthorized } from "../../store/slices/ui";
import dayjs from "dayjs";
import FormMessages from "../../features/form/FormMessages";

const NoFacilities = (): JSX.Element => {
    const org = useSelector((state: RootState) => state.organization);

    if (org.facilities?.length < 1) return (
        <p className="my-2 border-1 border-red-500 bg-red-100 py-1 px-3 rounded-lg leading-none inline-block">
            You don't have any facilities yet. <Link to="/" className="btn inline-block text-xs ml-2">Does Nothing</Link>
        </p>
    )
    else return <></>;
};

const Dashboard = (): JSX.Element => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    async function playOther(evt: React.MouseEvent<HTMLButtonElement>, otherTitle: string) {
        evt.preventDefault();
        const form = {
            email: user.email,
            organization: otherTitle
        };
        apiPost("accounts/signin", form).then((data) => {
            if (data.user && data.organization)  {
                dispatch(setOrganization(data.organization));
                dispatch(setIsAuthorized(true));
            } else {
                dispatch(setFormMessages([{
                    message: "This Email and Organization name combination seems to be invalid.",
                    type: "ERROR"
                }]));
            }
        });
    }

    return (
        <main>
            <h2 className="text-lg font-bold mb-2">Welcome, {user.title}!</h2>

            <h3>Level {user.level}</h3>

            <NoFacilities/>

            {user.organizations?.filter((o: Organization) => o.deletedAt == null).map((o: Organization) => {
                const age = dayjs(o.gameStart).diff(o.gameCurrent, djsIncrement);

                return (
                    <table className="table table-auto rounded-md overflow-hidden my-4" key={o._id}>
                        <tbody className="divide-y-1 divide-gray-400">
                            <tr className="bg-purple-800">
                                <th className="text-right p-1 pr-2 text-white">{o.title}</th>
                                <td className="text-right p-1">
                                    <button type="button" className="btn py-0" onClick={(evt) => playOther(evt, o.title)}>Play</button></td>
                            </tr>
                            <tr className="bg-gray-50">
                                <th className="text-right py-0.5 px-2">Balance</th>
                                <td className="text-right py-0.5 px-2">${o.balance.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <th className="text-right py-0.5 px-2">Level</th>
                                <td className="text-right py-0.5 px-2">{o.level}</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <th className="text-right py-0.5 px-2">Currently</th>
                                <td className="text-right py-0.5 px-2">{o.gameCurrent}</td>
                            </tr>
                            <tr>
                                <th className="text-right py-0.5 px-2">Age</th>
                                <td className="text-right py-0.5 px-2">{age == 1 ? `1 ${djsIncrement}` : `${age} ${djsIncrement}s`}</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <th className="text-right py-0.5 px-2">Facilities</th>
                                <td className="text-right py-0.5 px-2">{o.facilities?.length || 0}</td>
                            </tr>
                        </tbody>
                    </table>
                );
            })}

            <FormMessages/>
        </main>
    )
};

export default Dashboard;