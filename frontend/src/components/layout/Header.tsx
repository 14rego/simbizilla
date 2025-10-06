import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import type { RootState } from "../../store";
import { setIsBurgerVisible } from "../../store/slices/ui";
import { Menu } from "lucide-react";
import { useEffect, useMemo } from "react";

interface BreadcrumbItem {
    title: string,
    path: string
}

export default function Header() {
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const ui = useSelector((state: RootState) => state.ui);

    const burger = () => {
        if (ui.isAuthorized) return (
            <div className="inline-block relative mr-3">
                <button type="button" className="btn" onClick={() => dispatch(setIsBurgerVisible(!ui.isBurgerVisible))} aria-controls="burger" aria-label="Toggle Main Navigation Visibility" aria-selected={ui.isBurgerVisible}>
                    <Menu className="w-3 h-3" />
                </button>
                <nav id="burger" className={ui.isBurgerVisible ? 'absolute block shadow-md border rounded-lg mt-0.5 p-2 border-gray-200 bg-white dark:bg-purple-900' : 'sr-only'} aria-hidden={!ui.isBurgerVisible} aria-label="Main Navigation">
                    <ul>
                        <li><Link to="/" className="block p-2 leading-none whitespace-nowrap text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800">{user.nickname}&rsquo;s Dashboard</Link></li>
                        <li><Link to="/sign/out" className="block p-2 leading-none whitespace-nowrap text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-800">Sign Out</Link></li>
                    </ul>
                </nav>
            </div>
        );
        else if (location.pathname != "/sign/in") return (
            <Link to="/sign/in" className="btn inline-block text-xs mr-3">Sign In</Link>
        );
        else return ``;
    };

    // BREADCRUMBS
    const breadcrumbs: BreadcrumbItem[] = useMemo(() => {
        return [
            {
                title: "Dashboard",
                path: "/"
            }
        ];
    }, []);

    useEffect(() => {
        if (location.pathname.indexOf("user") > -1) {
            breadcrumbs.push({
                title: "Users",
                path: "/users/"
            });
        }
    }, [breadcrumbs, location.pathname]);

    const breadcrumbItems = breadcrumbs.map((item) => {
        if (item.path != location.pathname) return (
            <li><a href={item.path} className={item.path == '/' ? 'text-purple-600' : ''}>{item.title}</a></li>
        );
        return <li>{item.title}</li>;
    });

    const breadcrumbNav = () => {
        if (breadcrumbItems.length > 1) return (
            <nav aria-label="Breadcrumb">
                <ol className="flex items-center list-none">{breadcrumbItems}</ol>
            </nav>
        );
        return null;
    };

    return (
        <header>
            {burger()}
            <h1 className="uppercase">{ui.pageTitle}</h1>
            {breadcrumbNav()}
        </header>
    );
}