import fetchData from "../../config/api.config";

interface DataWatchOption {
    streaming_service: string
    title: string
    link_streaming: string
}

interface ParamsWatchOption {
    page?: number
    title?: string
}

const path = '/watch-options'

export const getWatchOptions = (
    { page = 1, title = '' }: ParamsWatchOption = {},
    signal: AbortSignal | undefined = undefined
) => {

    let params = '?'

    params += new URLSearchParams({ page: page.toString(), title: title }).toString()

    return fetchData({ method: "GET", path: `${path + params}`, signal })
}

export const deleteWatchOption = (id: string) => {
    return fetchData({ method: "DELETE", path: `${path}/${id}` })
}

export const createWatchOption = (data: DataWatchOption) => {
    return fetchData({ method: "POST", path, data })
}

export const getWatchOption = (id: string) => {
    return fetchData({ method: "GET", path: `${path}/${id}` })
}

export const editWatchOption = (id: string, data: DataWatchOption) => {
    return fetchData({ method: "PUT", path: `${path}/${id}`, data })
}