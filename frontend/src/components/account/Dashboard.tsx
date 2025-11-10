import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/index";
import { setGame, type Organization } from "../../store/slices/game";
import type { JSX } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../../features/form/helpers";
import { setFormMessages, setIsAuthorized, setIsProcessing } from "../../store/slices/ui";
import dayjs from "dayjs";
import FormMessages from "../../features/form/FormMessages";
import { djsIncrement } from "../../features/formatting/helpers";

const NoFacilities = (): JSX.Element => {
    const game = useSelector((state: RootState) => state.game);
    if (game.facilities?.length < 1) return (
        <p className="my-2 border-1 border-red-500 bg-red-100 py-1 px-3 rounded-lg leading-none inline-block dark:text-black">
            You don't have any facilities yet. <Link to="/play" className="btn inline-block text-xs ml-2">Get Started</Link>
        </p>
    )
    else return <></>;
};

const Dashboard = (): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);
    const game = useSelector((state: RootState) => state.game);
    const ui = useSelector((state: RootState) => state.ui);

    async function playOther(evt: React.MouseEvent<HTMLButtonElement>, otherTitle: string) {
        evt.preventDefault();
        if (otherTitle == game.title) {
            navigate("/play");
        } else {
            const form = {
                payload: {
                    email: user.email,
                    organization: otherTitle
                }
            };
            dispatch(setIsProcessing(true));
            apiPost("accounts/signin", form).then((res) => {
                if (res.data.user && res.data.organization)  {
                    dispatch(setGame(res.data.organization));
                    dispatch(setIsAuthorized(true));
                    navigate("/play");
                } else {
                    dispatch(setFormMessages([{
                        message: "This Email and Organization name combination seems to be invalid.",
                        type: "ERROR"
                    }]));
                }
                dispatch(setIsProcessing(false));
            });
        }
    };

    return (
        <main>
            <h2 className="text-lg font-bold mb-2">Welcome, {user.title}!</h2>
            <h3>Level {user.level} Player</h3>

            <NoFacilities/>

            {user.organizations?.filter((o: Organization) => o.deletedAt == null).map((o: Organization) => {
                const age = dayjs(o.gameStart).diff(o.gameCurrent, djsIncrement);

                return (
                    <table className="table table-auto rounded-md overflow-hidden my-4 dark:text-white" key={o._id}>
                        <tbody className="divide-y-1 divide-gray-400">
                            <tr className="bg-purple-800">
                                <th className="text-right p-1 pr-2 text-white">{o.title}</th>
                                <td className="text-right p-1">
                                    <button type="button" className="btn py-0" disabled={ui.setIsProcessing} onClick={(evt) => playOther(evt, o.title)}>Play</button></td>
                            </tr>
                            <tr>
                                <th className="text-right py-0.5 px-2">Balance</th>
                                <td className="text-right py-0.5 px-2">${o.balance.toFixed(2)}</td>
                            </tr>
                            <tr className="bg-gray-50 dark:bg-gray-950">
                                <th className="text-right py-0.5 px-2">Level</th>
                                <td className="text-right py-0.5 px-2">{o.level}</td>
                            </tr>
                            <tr>
                                <th className="text-right py-0.5 px-2">Currently</th>
                                <td className="text-right py-0.5 px-2">{o.gameCurrent}</td>
                            </tr>
                            <tr className="bg-gray-50 dark:bg-gray-950">
                                <th className="text-right py-0.5 px-2">Age</th>
                                <td className="text-right py-0.5 px-2">{age == 1 ? `1 ${djsIncrement}` : `${age} ${djsIncrement}s`}</td>
                            </tr>
                            <tr>
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