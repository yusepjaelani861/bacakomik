import type { RouteProps } from "react-router";
import Home from "../pages/Home";
import Manga from "../pages/Manga";
import ChapterPage from "../pages/Chapter";

type NewProps = Record<string, RouteProps>;

function createConfs<T extends NewProps>(confs: T): T {
    return {
        ...confs,
        params: 0,
    };
}

const routes = createConfs({
    home: {
        path: "/",
        element: <Home />,
        index: true,
        needAuth: true,
    },
    manga: {
        path: "/manga/:source/:url",
        element: <Manga />,
        needAuth: true,
    },
    chapter: {
        path: "/manga/:source/:url/:chapter",
        element: <ChapterPage />,
        needAuth: true,
    }
})

export const route = <T extends keyof typeof routes>(
    path: T,
    params?: Record<string, string | number>,
    queries?: Record<string, string>
) => {
    let fullPath = (routes as NewProps)[path]?.path ?? "";

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            fullPath = fullPath.replace(`:${key}`, String(value)); // Convert value to string before replacing
        });
    }

    const url = new URL(fullPath, window.location.origin);

    if (queries) {
        Object.keys(queries).forEach((key) => {
            url.searchParams.set(key, queries[key]!);
        });
    }

    return url.pathname + url.search;
    // return fullPath
};

export default routes