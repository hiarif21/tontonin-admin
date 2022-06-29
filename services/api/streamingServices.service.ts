import fetchData from "../../config/api.config";
import { CreateStreamingService, DeleteStreamingService, EditStreamingService, GetStreamingService, GetStreamingServices } from "../../types/streamingServices";

const path = '/streaming-services'

export const getStreamingServices: GetStreamingServices = () => {
    return fetchData({ method: "GET", path })
}

export const deleteStreamingService: DeleteStreamingService = (id) => {
    return fetchData({ method: "DELETE", path: `${path}/${id}` })
}

export const createStreamingService: CreateStreamingService = (data) => {
    return fetchData({ method: "POST", path, data })
}

export const getStreamingService: GetStreamingService = (id) => {
    return fetchData({ method: "GET", path: `${path}/${id}` })
}

export const editStreamingService: EditStreamingService = (id, data) => {
    return fetchData({ method: "PUT", path: `${path}/${id}`, data })
}