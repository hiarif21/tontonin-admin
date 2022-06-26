import fetchData from "../../config/api.config";

interface DataPerson {
    name: string
    role: string
}

interface ParamsPerson {
    page?: number
    name?: string
}

const path = '/persons'

export const getPersons = (
    { page = 1, name = '' }: ParamsPerson = {},
    signal: AbortSignal | undefined = undefined
) => {

    let params = '?'

    params += new URLSearchParams({ page: page.toString(), name: name }).toString()

    return fetchData({ method: "GET", path: `${path + params}`, signal })
}

export const deletePerson = (id: string) => {
    return fetchData({ method: "DELETE", path: `${path}/${id}` })
}

export const createPerson = (data: DataPerson) => {
    return fetchData({ method: "POST", path, data })
}

export const getPerson = (id: string) => {
    return fetchData({ method: "GET", path: `${path}/${id}` })
}

export const editPerson = (id: string, data: DataPerson) => {
    return fetchData({ method: "PUT", path: `${path}/${id}`, data })
}