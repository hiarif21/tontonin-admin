import fetchData from "../../config/api.config";
import { CreatePerson, DeletePerson, EditPerson, GetPerson, GetPersons } from "../../types/persons";

const path = '/persons'

export const getPersons: GetPersons = (
    { page = 1, name = '' } = {},
    signal = undefined
) => {

    let params = '?'

    params += new URLSearchParams({ page: page.toString(), name: name }).toString()

    return fetchData({ method: "GET", path: `${path + params}`, signal })
}

export const deletePerson: DeletePerson = (id) => {
    return fetchData({ method: "DELETE", path: `${path}/${id}` })
}

export const createPerson: CreatePerson = (data) => {
    return fetchData({ method: "POST", path, data })
}

export const getPerson: GetPerson = (id) => {
    return fetchData({ method: "GET", path: `${path}/${id}` })
}

export const editPerson: EditPerson = (id, data) => {
    return fetchData({ method: "PUT", path: `${path}/${id}`, data })
}