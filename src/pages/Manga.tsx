import { useParams } from "react-router"
import GuestLayout from "../layouts/GuestLayout"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import ScrapeService, { Manga } from "../services/scrape.service"
import { Book, Loader } from "react-feather"
import Card from "../components/Card"
import { Link } from "react-router-dom"

const MangaPage: React.FC = () => {
    const params = useParams()
    const [manga, setManga] = useState<Manga | null>(null)

    const { source, url } = params as { source: string, url: string }

    const { data, isLoading } = useQuery({
        queryKey: [
            "manga",
            source,
            url
        ],
        queryFn: () => ScrapeService.detail({
            source,
            url
        })
    })

    useEffect(() => {
        if (data) {
            setManga(data.data)
        }
    }, [data])

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center">
                <Loader className="animate-spin" />
            </div>
        )
    }

    if (manga === null) {
        return (
            <GuestLayout>
                <div className="min-h-screen w-full flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold">
                        Manga Not Found
                    </p>
                </div>
            </GuestLayout>
        )
    }

    return !isLoading && manga && (
        <GuestLayout>
            <div className="flex flex-col gap-4">
                <Card>
                    <div className="flex items-start md:gap-8 gap-4 md:flex-row flex-col">
                        <div className="w-fit flex-shrink-0">
                            <picture className="relative">
                                <img
                                    src={manga?.thumbnail}
                                    alt={manga?.title}
                                    className="rounded-lg"
                                />
                                <div className="absolute top-0 left-0 bg-gradient-to-r from-indigo-900 to-neutral-500 p-1 rounded-lg text-white font-bold">
                                    {manga?.type}
                                </div>
                            </picture>
                        </div>

                        <div className="w-full flex-grow">
                            <h1 className="text-2xl font-bold">
                                {manga?.title}
                            </h1>

                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-start gap-1">
                                    <p className="text-sm font-semibold">
                                        Status: {manga?.status}
                                    </p>
                                    <p className="text-sm font-semibold">
                                        Author: {manga?.author}
                                    </p>
                                    <p className="text-sm font-semibold">
                                        Type: {manga?.type}
                                    </p>
                                    <p className="text-sm font-semibold">
                                        Genres: {manga?.genres.join(", ")}
                                    </p>

                                    <div className="flex flex-col gap-1 mt-4">
                                        <p className="text-sm font-semibold">
                                            Synopsis:
                                        </p>
                                        <p className="text-xs">{manga.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <h1 className="text-xl font-bold">
                        Chapters
                    </h1>

                    <div className="flex flex-col gap-2 mt-4">
                        {manga.chapters.map((item, index) => (
                            <Link
                                key={index}
                                to={`/manga/${source}/${url}/${item.url}`}
                                className="flex items-center gap-4 p-2 px-4 border-2 border-transparent hover:border-black hover:bg-gray-100 rounded-lg"
                            >
                                <Book />
                                <p className="text-sm font-semibold">
                                    {item.title}
                                </p>
                            </Link>
                        ))}
                    </div>
                </Card>
            </div>
        </GuestLayout>
    )
}

export default MangaPage