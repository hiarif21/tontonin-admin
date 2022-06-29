import fetchData from "../../config/api.config";
import { CreateMovie, DeleteMovie, EditMovie, GetMovie, GetMovies } from "../../types/movies";

const path = '/movies'

export const getMovies: GetMovies = (
    { page = 1, title = '' } = {},
    signal = undefined
) => {

    const params = new URLSearchParams({ page: page.toString(), title: title }).toString()

    return fetchData({ method: "GET", path: `${path + "?" + params}`, signal })
}

export const deleteMovie: DeleteMovie = (id) => {
    return fetchData({ method: "DELETE", path: `${path}/${id}` })
}

export const createMovie: CreateMovie = (data) => {
    return fetchData({ method: "POST", path, data })
}

export const getMovie: GetMovie = (id) => {
    return fetchData({ method: "GET", path: `${path}/${id}` })
}

export const editMovie: EditMovie = (id: string, data) => {
    return fetchData({ method: "PUT", path: `${path}/${id}`, data })
}