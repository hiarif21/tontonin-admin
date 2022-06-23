import fetchData from "../../config/api.config";

const path = '/genres'

export const getGenres = () => {
    return fetchData({ method: "GET", path })
}

export const deleteGenre = (id: string) => {
    return fetchData({ method: "DELETE", path: `${path}/${id}` })
}

export const createGenre = (data: { name: string }) => {
    return fetchData({ method: "POST", path, data })
}

export const getGenre = (id: string) => {
    return fetchData({ method: "GET", path: `${path}/${id}` })
}

export const editGenre = (id: string, data: { name: string }) => {
    return fetchData({ method: "PUT", path: `${path}/${id}`, data })
}