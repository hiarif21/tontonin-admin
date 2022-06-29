import fetchData from "../../config/api.config";
import { CreateRole, DeleteRole, EditRole, GetRole, GetRoles } from "../../types/roles";

const path = '/roles'

export const getRoles: GetRoles = () => {
    return fetchData({ method: "GET", path })
}

export const deleteRole: DeleteRole = (id) => {
    return fetchData({ method: "DELETE", path: `${path}/${id}` })
}

export const createRole: CreateRole = (data) => {
    return fetchData({ method: "POST", path, data })
}

export const getRole: GetRole = (id) => {
    return fetchData({ method: "GET", path: `${path}/${id}` })
}

export const editRole: EditRole = (id, data) => {
    return fetchData({ method: "PUT", path: `${path}/${id}`, data })
}