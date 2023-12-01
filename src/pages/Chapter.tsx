import { useParams } from "react-router"
import GuestLayout from "../layouts/GuestLayout"
import { useEffect, useState } from "react"
import ScrapeService, { Manga } from "../services/scrape.service"
import { useQueries } from "@tanstack/react-query"
import { ChevronLeft, ChevronRight, Loader } from "react-feather"
import Card from "../components/Card"
import Button from "../components/Button"

const ChapterPage: React.FC = () => {
    const params = useParams()
    const [manga, setManga] = useState<Manga | null>(null)

    const { source, url, chapter } = params as { source: string, url: string, chapter: string }

    const datas = useQueries({
        queries: [
            {
                queryKey: [
                    "manga",
                    source,
                    url,
                ],
                queryFn: () => ScrapeService.detail({
                    source,
                    url
                })
            },
            {
                queryKey: [
                    "chapter",
                    source,
                    url,
                    chapter
                ],
                queryFn: () => ScrapeService.chapter({
                    source,
                    url: chapter
                })
            }
        ]
    })

    const { data: mangaData } = datas[0]
    const { data: chapterData, isLoading } = datas[1]

    useEffect(() => {
        if (mangaData) {
            setManga(mangaData.data)
        }
    }, [mangaData, chapterData])

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center">
                <Loader className="animate-spin" />
            </div>
        )
    }

    return chapterData && (
        <GuestLayout>
            {manga && (
                <CardCoy
                    manga={manga}
                    chapter={chapter}
                    source={source}
                    url={url}
                />
            )}

            <h1 className="text-xl font-bold text-center py-4">
                {chapterData.data.title}
            </h1>

            <div className="w-full py-4">
                <div className="flex flex-col items-center justify-center">
                    {chapterData.data.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={chapterData.data.title}
                            className="w-full"
                        />
                    ))}
                </div>
            </div>

            {manga && (
                <CardCoy
                    manga={manga}
                    chapter={chapter}
                    source={source}
                    url={url}
                />
            )}
        </GuestLayout>
    )
}

export const CardCoy: React.FC<{
    manga: Manga | null
    chapter: string
    source: string,
    url: string,
}> = ({
    manga,
    chapter,
    source,
    url
}) => {
        const [nextURL, setNextURL] = useState<string | null>(null)
        const [prevURL, setPrevURL] = useState<string | null>(null)

        useEffect(() => {
            if (manga) {
                const index = manga.chapters.findIndex((item) => item.url === chapter)

                if (index !== -1) {
                    if (index !== 0) {
                        setPrevURL(manga.chapters[index - 1].url)
                    }

                    if (index !== manga.chapters.length - 1) {
                        setNextURL(manga.chapters[index + 1].url)
                    }
                }
            }
        }, [])

        return (
            <Card>
                <div className="flex items-center justify-between gap-4">
                    <img
                        src={manga?.thumbnail}
                        about={manga?.title}
                        className="w-14 rounded-lg flex-shrink-0"
                    />

                    <div className="flex flex-col flex-grow">
                        <p className="text-lg font-bold">
                            {manga?.title}
                        </p>
                        <p className="text-xs font-semibold">
                            Total Chapter {manga?.chapters.length}
                        </p>

                        <p className="mt-4">
                            <select
                                className="py-2 px-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent w-full"
                                onChange={(e) => window.location.href = `/manga/${source}/${url}/${e.target.value}`}
                            >
                                {manga?.chapters.map((item, index) => (
                                    <option
                                        key={index}
                                        value={item.url}
                                        selected={item.url === chapter}
                                    >
                                        {item.title}
                                    </option>
                                ))}
                            </select>
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            disabled={prevURL === null}
                            onClick={() => window.location.href = `/manga/${source}/${url}/${prevURL}`}
                            className="!px-2"
                        >
                            <ChevronLeft size={20} />
                        </Button>
                        <Button
                            type="button"
                            disabled={nextURL === null}
                            onClick={() => window.location.href = `/manga/${source}/${url}/${nextURL}`}
                            className="!px-2"
                        >
                            <ChevronRight size={20} />
                        </Button>
                    </div>
                </div>
            </Card>
        )
    }

export default ChapterPage