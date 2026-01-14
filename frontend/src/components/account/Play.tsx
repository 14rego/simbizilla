import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/index";
import { useEffect, useState, type JSX } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import type { Facility } from "../../store/models/facility";
import { djsFormat, djsIncrement, monetize } from "../../helpers/format";
import { apiGet, apiPost } from "../../helpers/form";
import _ from "lodash";
import { initLocation, type Location } from "../../store/models/location";
import { initCategory, type Category } from "../../store/models/category";
import { Loader, SquarePlay } from "lucide-react";
import { setFormMessages, setIsProcessing } from "../../store/slices/ui";
import { typedApiPayload } from "../../store/models/form";
import { setGame } from "../../store/slices/game";
import FormMessages from "../../features/form/FormMessages";
import type { Checkbook } from "../../store/models/checkbook";

const Play = (): JSX.Element => {
    const dispatch = useDispatch();
    const ui = useSelector((state: RootState) => state.ui);
    const game = useSelector((state: RootState) => state.game);
    const [form] = useState(typedApiPayload({}));
    form.game = game._id;

    const [support, setSupport] = useState({ 
        loading: true,
        categories: [],
        locations: [],
        costMapLocations: []
    });

    const getSupport = () => {
        if (support.loading === true) apiGet(`facilities/support`).then((res) => {
            setSupport((prev) => _.merge({}, prev, res.data, { loading: false }));
        });
    };

    useEffect(() => {
        getSupport();
    });

    async function advanceGame(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        dispatch(setIsProcessing(true));
        apiPost(`organizations/play`, form).then((res) => {
            if (res.status == 200 && res.data) {
                dispatch(setGame(res.data));
            } else {
                dispatch(setFormMessages(res.errors.map((err: object) => {
                    return {
                        message: Object.keys(err)[0],
                        type: "ERROR"
                    }
                })));
            }
        }).catch((err) => {
            console.warn(err);
            dispatch(setFormMessages([{
                message: "How unfortunate. You broke it.",
                type: "ERROR"
            }]));
        }).finally(() => {
            dispatch(setIsProcessing(false));
        });
    };

    return (
        <main>
            <h2 className="text-lg text-center font-bold mb-2">{game.title}</h2>
            <p className="flex flex-wrap justify-between">
                <span className="w-20">{game.gameCurrent}</span>
                <span className="px-2 font-mono"><span className={game.balance >= 0 ? "text-green-800" : "text-red-800"}>{monetize(game.balance)}</span></span>
                <span className="w-20 text-right">Level {game.level}</span>
            </p>

            <p className="my-2 flex justify-center">
                {ui.isProcessing ?
                    <button type="button" disabled className="btn">
                        <Loader className="inline-block mr-1 -mt-1" />
                        {dayjs(game.gameCurrent).add(1, djsIncrement).format(djsFormat)}
                    </button>
                :
                    <button type="button" onClick={advanceGame} className="btn secondary">
                        <SquarePlay className="inline-block mr-1 -mt-1" />
                        {dayjs(game.gameCurrent).add(1, djsIncrement).format(djsFormat)}
                    </button>
                }
            </p>
            <FormMessages/>

            <section className="my-4">
                <h3 className="flex justify-between items-center border-b-1 border-purple-800 pb-1">
                    <span className="text-lg font-bold">Recent Checkbook Entries</span>
                </h3>
                <table className="table mt-1">
                    <thead>
                        <tr>
                            <th className="text-right">Date</th>
                            <th>Title</th>
                            <th className="text-right">+/-</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-500">
                        {game.checkbooks.map((cbk: Checkbook) => {
                            if (dayjs(game.gameCurrent).diff(cbk.gameStart, djsIncrement) > 3) return false;
                            return (
                                <tr key={cbk._id} className="even:bg-gray-100 dark:even:bg-gray-900">
                                    <td className="text-right w-24">{cbk.gameStart}</td>
                                    <td>{cbk.title}</td>
                                    <td className="text-right font-mono">{monetize(cbk.value)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>

            <section className="my-4">
                <h3 className="flex justify-between items-center border-b-1 border-purple-800 pb-1">
                    <span className="text-lg font-bold">{game.title} Facilities</span>
                    <Link to="/create/facility" className="btn">New</Link>
                </h3>
                <ul aria-label="List of Facilities" className="divide-y divide-gray-500">
                    {game.facilities.filter((f: Facility) => f.deletedAt == null).map((f: Facility) => {
                        const age = dayjs(game.gameCurrent).diff(f.gameStart, djsIncrement);
                        const location = support.locations.find((l: Location) => l._id == f.locationId) || initLocation;
                        const category = support.categories.find((c: Category) => c._id == f.categoryId) || initCategory;
                        return (
                            <li key={f._id}>
                                <h5 className="text-lg text-center font-bold mb-2">{f.title}</h5>
                                <p className="flex flex-wrap justify-between">
                                    <span>{location.title}</span>
                                    <span className="text-right">{category.title}</span>
                                </p>
                                <p className="flex flex-wrap justify-between">
                                    <span className="w-20">{age == 1 ? `1 ${djsIncrement}` : `${age} ${djsIncrement}s`}</span>
                                    <span className="px-2 font-mono"><span className={f.balance >= 0 ? "text-green-800" : "text-red-800"}>{monetize(f.balance)}</span></span>
                                    <span className="w-20 text-right">Level {f.level}</span>
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </main>
    )
};

export default Play;