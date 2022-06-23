import axios, { AxiosError, AxiosRequestConfig } from "axios";

const root = process.env.NEXT_PUBLIC_ROOT_API;

interface fetchDataProps extends AxiosRequestConfig {
    path: string;
}

const fetchData = async ({ method, path, data = null }: fetchDataProps) => {
    const url = root + path

    let configAxios: AxiosRequestConfig

    if (data === null) {
        configAxios = { method, url, responseType: "json" }
    } else {
        configAxios = { method, url, data }
    }

    try {
        const response = await axios(configAxios)
        return response.data
    } catch (error) {
        const err = error as AxiosError;
        return err.response?.data;
    }

}

export default fetchData