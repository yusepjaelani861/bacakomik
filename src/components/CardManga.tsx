import { Link } from "react-router-dom"
import { ListManga } from "../services/scrape.service"

interface Props {
    manga: ListManga
}

const CardManga: React.FC<Props> = ({ manga }) => {
    return (
        <Link
            to={`/manga/${manga.source}/${manga.url}`}
            className="bg-white rounded-lg shadow-lg p-2">
            <picture className="relative">
                <img
                    src={manga.thumbnail}
                    alt={manga.title}
                    className="rounded-lg"
                />
                <div className="absolute top-0 left-0 bg-gradient-to-r from-indigo-900 to-neutral-500 py-2 rounded-lg text-white font-bold text-sm px-4">
                    {manga.source}
                </div>
            </picture>

            <div className="mt-2">
                <p className="text-sm font-semibold">
                    {manga.title}
                </p>
            </div>
        </Link>
    )
}

export default CardManga