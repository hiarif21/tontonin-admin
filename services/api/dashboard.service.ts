import fetchData from "../../config/api.config";

const path = '/'

export const getDashboard = () => {
    return fetchData({ method: "GET", path })
}