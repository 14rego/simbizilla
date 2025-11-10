import { useSelector } from "react-redux";
import type { RootState } from "../../store/index";
import { useEffect, useState, type JSX } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import type { Facility } from "../../store/models/facility";
import { djsIncrement, monetize } from "../../features/formatting/helpers";
import { apiGet } from "../../features/form/helpers";
import _ from "lodash";
import { initLocation, type Location } from "../../store/models/location";
import { initCategory, type Category } from "../../store/models/category";

const Play = (): JSX.Element => {
    const game = useSelector((state: RootState) => state.game);

    const [support, setSupport] = useState({ 
        loading: true,
        categories: [],
        locations: [],
        priceMapLocation: {}
    });
    const getSupport = () => {
        if (support.loading === true) apiGet(`facilities/support`).then((res) => {
            setSupport((prev) => _.merge({}, prev, res.data, { loading: false }));
        });
    };

    useEffect(() => {
        getSupport();
    });

    return (
        <main>
            <h2 className="text-lg text-center font-bold mb-2">{game.title}</h2>
            <p className="flex flex-wrap justify-between">
                <span className="w-20">{game.gameCurrent}</span>
                <span className="px-2 font-mono"><span className={game.balance >= 0 ? "text-green-800" : "text-red-800"}>{monetize(game.balance)}</span></span>
                <span className="w-20 text-right">Level {game.level}</span>
            </p>

            <section className="my-4">
                <h3 className="flex justify-between items-center border-b-1 border-purple-800 pb-1">
                    <span className="text-lg font-bold">{game.title} Facilities</span>
                    <Link to="/create/facility" className="btn">New</Link>
                </h3>
                <ul aria-label="List of Facilities" className="divide-y divide-gray-500">
                    {game.facilities.filter((f: Facility) => f.deletedAt == null).map((f: Facility) => {
                        const age = dayjs(f.gameStart).diff(game.gameCurrent, djsIncrement);
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