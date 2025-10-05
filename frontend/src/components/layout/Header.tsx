import { useLocation } from "react-router-dom";

interface BreadcrumbItem {
    title: string,
    path: string
}

export default function Header() {
    const location = useLocation();

    let docTitle = "Simbizilla | ";
    let title = "Simbizilla";

    const dashboard: BreadcrumbItem = {
            title: "Dashboard",
            path: "/"
    };
    const breadcrumbs: [BreadcrumbItem] = [dashboard];

    if (location.pathname.indexOf("user") > -1) {
        title = "Users";
        docTitle += "Users";

        breadcrumbs.push({
            title: "Users",
            path: "/users/"
        });
    }

    document.title = docTitle;

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
            <h1 className="uppercase">{title}</h1>
            {breadcrumbNav()}
        </header>
    );
}