import { useEffect, useState } from "react";
import Button from "./Button"
import { useQuery } from "@tanstack/react-query";
import ScrapeService from "../services/scrape.service";
import Card from "./Card";

const SourceButton: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [sources, setSources] = useState<string[]>([])

    const { data } = useQuery({
        queryKey: [
            "sources",
        ],
        queryFn: () => ScrapeService.scrape()
    })

    useEffect(() => {
        if (data) {
            setSources(data.data)
        }
    }, [data])
    return (
        <>
            <Button
                type="button"
                className=""
                onClick={() => setOpen((prev) => !prev)}
            >
                Source
            </Button>

            <div className={`fixed inset-0 bg-black/20 z-40 ${open ? "block" : "hidden"}`} onClick={() => setOpen(false)}></div>
            <div className={`fixed inset-0 w-full h-full z-50 ${open ? "block" : "hidden"}`}>
                <div className="flex items-center justify-center h-screen overflow-auto">
                    <Card className="w-2/3 overflow-auto">
                        <h1 className="text-xl font-bold mb-4">
                            Select Sources
                        </h1>
                        <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-4">
                            {sources.map((source, index) => (
                                <Button
                                    key={index}
                                    type="button"
                                    onClick={() => {
                                        localStorage.setItem("source", source)
                                        window.location.reload()
                                    }}
                                >
                                    {source}
                                </Button>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default SourceButton;