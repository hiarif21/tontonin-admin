import fetchData from "../../config/api.config";

interface DataDiscover {
    title: string
    movies: string[]
}

interface ParamsDiscover {
    page?: number
    title?: string
}

const path = '/discovers'

export const getDiscovers = (
    { page = 1, title = '' }: ParamsDiscover = {},
    signal: AbortSignal | undefined = undefined
) => {

    let params = '?'

    params += new URLSearchParams({ page: page.toString(), title: title }).toString()

    return fetchData({ method: "GET", path: `${path + params}`, signal })
}

export const deleteDiscover = (id: string) => {
    return fetchData({ method: "DELETE", path: `${path}/${id}` })
}

export const createDiscover = (data: DataDiscover) => {
    return fetchData({ method: "POST", path, data })
}

export const getDiscover = (
    id: string,
    { page = 1 }: ParamsDiscover = {},
    signal: AbortSignal | undefined = undefined
) => {

    let params = '?'

    params += new URLSearchParams({ page: page.toString() }).toString()

    return fetchData({ method: "GET", path: `${path}/${id + params}`, signal })
}

export const editDiscover = (id: string, data: DataDiscover) => {
    return fetchData({ method: "PUT", path: `${path}/${id}`, data })
}