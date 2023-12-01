import axios from "axios"

export interface ListManga {
    title: string
    url: string
    thumbnail: string
    source: string
}

export interface Manga {
    title: string
    subtitle: string
    description: string
    thumbnail: string
    type: string
    author: string
    status: string
    genres: string[]
    chapters: ChapterManga[]
}

export interface ChapterManga {
    title: string
    url: string
}

export interface Chapter {
    title: string
    images: string[]
}

class ScrapeService {
    static scrape = async (): Promise<ApiResponse<string[]>> => {
        const { data } = await axios.get("https://mitestore.com/api/scrape")

        return data
    }

    static manga = async (payload: {
        source: string,
        page: number,
        search?: string
    }): Promise<ApiResponse<ListManga[]>> => {
        const { data } = await axios.get(`https://mitestore.com/api/scrape/${payload.source}?page=${payload.page}&search=${payload.search}`)

        return data
    }

    static detail = async (payload: {
        source: string
        url: string
    }): Promise<ApiResponse<Manga>> => {
        const { data } = await axios.get(`https://mitestore.com/api/scrape/${payload.source}/${payload.url}/manga`)

        return data
    }

    static chapter = async (payload: {
        source: string
        url: string
    }): Promise<ApiResponse<Chapter>> => {
        const { data } = await axios.get(`https://mitestore.com/api/scrape/${payload.source}/${payload.url}/chapter`)

        return data
    }
}

export default ScrapeService