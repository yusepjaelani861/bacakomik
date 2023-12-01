import { useEffect, useState } from "react"
import GuestLayout from "../layouts/GuestLayout"
import ScrapeService, { ListManga } from "../services/scrape.service"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import Button from "../components/Button"
import CardManga from "../components/CardManga"
import { Loader } from "react-feather"

const Home: React.FC = () => {
    const [mangas, setMangas] = useState<ListManga[]>([])
    const [page, setPage] = useState<number>(1)

    const [source, setSource] = useState<string | null>(null)

    const [searchParams] = useSearchParams()
    const [search] = useState<string>(searchParams.get("search") || "")

    const { data, isLoading } = useQuery({
        queryKey: [
            "mangas",
            page,
            search,
            source,
        ],
        queryFn: () => ScrapeService.manga({
            page,
            source: source!,
            search,
        }),
        enabled: source !== null
    })

    useEffect(() => {
        setSource(localStorage.getItem("source") || "komiku")
    }, [])

    useEffect(() => {
        if (data) {
            setMangas(data.data)
        }
    }, [data])

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center">
                <Loader className="animate-spin" />
            </div>
        )
    }

    return (
        <GuestLayout>
            <h1 className="text-xl font-bold">
                Projects Update
            </h1>

            <div className="mt-4 w-full">
                <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-4">
                    {mangas.map((manga, index) => (
                        <CardManga key={index} manga={manga} />
                    ))}
                </div>
                {mangas.length === 0 && (
                    <div className="col-span-full text-center">
                        <p className="text-sm text-gray-500">
                            No data found
                        </p>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4 justify-center mt-4">
                <Button
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={page === 1}
                >
                    Previous
                </Button>
                <Button
                    type="button"
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={isLoading || data && data?.data.length === 0}
                >
                    Next
                </Button>
            </div>
        </GuestLayout>
    )
}

export default Home