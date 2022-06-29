import fetchData from "../../config/api.config";
import { CreateWatchOption, DeleteWatchOption, EditWatchOption, GetWatchOption, GetWatchOptions } from "../../types/watchOptions";

const path = '/watch-options'

export const getWatchOptions: GetWatchOptions = ({ page = 1, title = '' } = {}, signal = undefined
) => {

    const params = new URLSearchParams({ page: page.toString(), title: title }).toString()

    return fetchData({ method: "GET", path: `${path + "?" + params}`, signal })
}

export const deleteWatchOption: DeleteWatchOption = (id: string) => {
    return fetchData({ method: "DELETE", path: `${path}/${id}` })
}

export const createWatchOption: CreateWatchOption = (data) => {
    return fetchData({ method: "POST", path, data })
}

export const getWatchOption: GetWatchOption = (id) => {
    return fetchData({ method: "GET", path: `${path}/${id}` })
}

export const editWatchOption: EditWatchOption = (id, data) => {
    return fetchData({ method: "PUT", path: `${path}/${id}`, data })
}