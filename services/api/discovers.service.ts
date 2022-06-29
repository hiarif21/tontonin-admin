import fetchData from "../../config/api.config";
import { CreateDiscover, DeleteDiscover, EditDiscover, GetDiscover, GetDiscovers } from "../../types/discovers";

const path = '/discovers'

export const getDiscovers: GetDiscovers = ({ page = 1, title = '' } = {}, signal = undefined) => {

    const params = new URLSearchParams({ page: page.toString(), title: title }).toString()

    return fetchData({ method: "GET", path: `${path + "?" + params}`, signal })
}

export const deleteDiscover: DeleteDiscover = (id) => {
    return fetchData({ method: "DELETE", path: `${path}/${id}` })
}

export const createDiscover: CreateDiscover = (data) => {
    return fetchData({ method: "POST", path, data })
}

export const getDiscover: GetDiscover = (id, { page = 1 } = {}, signal = undefined) => {

    let params = new URLSearchParams({ page: page.toString() }).toString()

    return fetchData({ method: "GET", path: `${path}/${id + "?" + params}`, signal })
}

export const editDiscover: EditDiscover = (id, data) => {
    return fetchData({ method: "PUT", path: `${path}/${id}`, data })
}