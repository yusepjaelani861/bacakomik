import { Link } from "react-router-dom";
import SourceButton from "./SourceButton";
import SearchButton from "./SearchButton";

const Header: React.FC = () => {

    return (
        <header className="py-3 px-4 bg-white dark:bg-slate-800 w-full shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                    <Link to="/">
                        <h1 className="text-2xl font-bold">Baca Komik</h1>
                    </Link>

                    <div className="md:flex items-center hidden gap-2">
                        <Link to="/" className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-indigo-500 hover:text-white font-semibold text-sm">Home</Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <SourceButton />
                    <SearchButton />
                </div>
            </div>
        </header>
    )
}

export default Header;