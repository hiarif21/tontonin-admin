import fetchData from "../../config/api.config";
import { CreateGenre, DeleteGenre, EditGenre, GetGenre, GetGenres } from "../../types/genres";

const path = '/genres'

export const getGenres: GetGenres = () => {
    return fetchData({ method: "GET", path })
}

export const deleteGenre: DeleteGenre = (id) => {
    return fetchData({ method: "DELETE", path: `${path}/${id}` })
}

export const createGenre: CreateGenre = (data) => {
    return fetchData({ method: "POST", path, data })
}

export const getGenre: GetGenre = (id) => {
    return fetchData({ method: "GET", path: `${path}/${id}` })
}

export const editGenre: EditGenre = (id, data) => {
    return fetchData({ method: "PUT", path: `${path}/${id}`, data })
}