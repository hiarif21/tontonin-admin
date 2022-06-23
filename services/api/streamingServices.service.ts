import fetchData from "../../config/api.config";

const path = '/streaming-services'

export const getStreamingServices = () => {
    return fetchData({ method: "GET", path })
}

export const deleteStreamingService = (id: string) => {
    return fetchData({ method: "DELETE", path: `${path}/${id}` })
}

export const createStreamingService = (data: { name: string }) => {
    return fetchData({ method: "POST", path, data })
}

export const getStreamingService = (id: string) => {
    return fetchData({ method: "GET", path: `${path}/${id}` })
}

export const editStreamingService = (id: string, data: { name: string }) => {
    return fetchData({ method: "PUT", path: `${path}/${id}`, data })
}