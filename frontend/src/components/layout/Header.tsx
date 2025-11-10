import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import type { RootState } from "../../store";
import { setIsBurgerVisible } from "../../store/slices/ui";
import { ChevronRight, Menu } from "lucide-react";
import { useMemo, type JSX } from "react";

interface BreadcrumbItem {
    title: string,
    path: string
};

export default function Header() {
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const game = useSelector((state: RootState) => state.game);
    const ui = useSelector((state: RootState) => state.ui);

    const burger = (): JSX.Element => {
        if (ui.isAuthorized) return (
            <div className="inline-block relative mr-3">
                <button type="button" className="btn" id="burger" onClick={() => dispatch(setIsBurgerVisible(!ui.isBurgerVisible))} aria-controls="burger" aria-label="Toggle Main Navigation Visibility" aria-selected={ui.isBurgerVisible}>
                    <Menu className="w-3 h-3" />
                </button>
                <nav id="burger" className={ui.isBurgerVisible ? 'absolute block shadow-md border rounded-lg mt-0.5 p-2 border-gray-200 bg-white dark:bg-purple-900' : 'sr-only'} aria-hidden={!ui.isBurgerVisible} aria-label="Main Navigation">
                    <ul>
                        <li><Link to="/" className="block p-2 leading-none whitespace-nowrap text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800">{user.title}&rsquo;s Dashboard</Link></li>
                        <li><Link to="/play" className="block p-2 leading-none whitespace-nowrap text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800">Play {game.title}</Link></li>
                        <li><Link to="/sign/out" className="block p-2 leading-none whitespace-nowrap text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800">Sign Out</Link></li>
                    </ul>
                </nav>
            </div>
        );
        else if (location.pathname != "/sign/in") return (
            <Link to="/sign/in" className="btn inline-block text-xs mr-3">Sign In</Link>
        );
        else return <></>;
    };

    // BREADCRUMBS
    const breadcrumbs: BreadcrumbItem[] = useMemo(() => {
        const arr = [
            {
                title: "Dashboard",
                path: "/"
            }
        ];
        if (location.pathname.indexOf("/play") > -1) {
            arr.push({
                title: "Play",
                path: "/play"
            });
        }
        return arr;
    }, [location.pathname]);

    const breadcrumbNav = (): JSX.Element => {
        if (breadcrumbs.length > 1) return (
            <nav aria-label="Breadcrumb">
                <ol className="ml-4 flex items-center list-none">
                    {breadcrumbs.map((item, i) => {
                        if (item.path != location.pathname) return (
                            <li key={item.path} className="pr-1 leading-none">
                                <ChevronRight className={i == 0 ? "hidden" : "inline-block -mt-1 w-4 h-4"} />
                                <Link to={{ pathname: item.path }} className="text-purple-500 hover:text-purple-800 hover:underline font-normal">{item.title}</Link>
                            </li>
                        );
                        return <li key={item.path} className="pr-1 leading-none">
                            <ChevronRight className="inline-block -mt-1 w-4 h-4" />
                            <span>{item.title}</span>
                        </li>;
                    })}
                </ol>
            </nav>
        );
        return <></>;
    };

    return (
        <header>
            {burger()}
            <h1 className="uppercase">{ui.pageTitle}</h1>
            {breadcrumbNav()}
        </header>
    );
}