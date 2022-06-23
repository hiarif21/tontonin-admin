import fetchData from "../../config/api.config";

const path = '/roles'

export const getRoles = () => {
    return fetchData({ method: "GET", path })
}

export const deleteRole = (id: string) => {
    return fetchData({ method: "DELETE", path: `${path}/${id}` })
}

export const createRole = (data: { name: string }) => {
    return fetchData({ method: "POST", path, data })
}

export const getRole = (id: string) => {
    return fetchData({ method: "GET", path: `${path}/${id}` })
}

export const editRole = (id: string, data: { name: string }) => {
    return fetchData({ method: "PUT", path: `${path}/${id}`, data })
}