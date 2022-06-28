import fetchData from "../../config/api.config";

interface DataMovie {
    title: string
    image: string
    release_year: number
    runtime: number
    storyline: string
    link_trailer: string
    watch_options: string[]
    persons: string[]
    genres: string[]
}

interface ParamsMovie {
    page?: number
    title?: string
}

const path = '/movies'

export const getMovies = (
    { page = 1, title = '' }: ParamsMovie = {},
    signal: AbortSignal | undefined = undefined
) => {

    let params = '?'

    params += new URLSearchParams({ page: page.toString(), title: title }).toString()

    return fetchData({ method: "GET", path: `${path + params}`, signal })
}

export const deleteMovie = (id: string) => {
    return fetchData({ method: "DELETE", path: `${path}/${id}` })
}

export const createMovie = (data: DataMovie) => {
    return fetchData({ method: "POST", path, data })
}

export const getMovie = (id: string) => {
    return fetchData({ method: "GET", path: `${path}/${id}` })
}

export const editMovie = (id: string, data: DataMovie) => {
    return fetchData({ method: "PUT", path: `${path}/${id}`, data })
}