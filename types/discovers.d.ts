import { Dispatch } from "react"
import { DataGenre } from "./genres"
import { DataMovie } from "./movies"
import { DataPerson } from "./persons"
import { DataStreamingService } from "./streamingServices"
import { DataWatchOption } from "./watchOptions"

// others
export interface DataDiscover {
    _id: string
    title: string
    movies: DataMovie[]
}

// response api
export interface GetDiscoversResponse {
    success: boolean,
    message: string,
    page: number
    total_page: number
    total_data: number
    data: [] | DataDiscover[]
}

export interface DeleteDiscoversResponse {
    success: boolean,
    message: string,
}

export interface CreateDiscoversResponse {
    success: boolean,
    message: string,
    data: DataDiscover | undefined
}

export interface GetDiscoverResponse {
    success: boolean,
    message: string,
    page: number
    total_page: number
    total_movies: number
    data: DataDiscover | undefined
}

export interface EditDiscoverResponse {
    success: boolean,
    message: string,
}

// context & services
export interface DataCreateDiscover {
    title: string
    movies: string[]
}

export interface DiscoversParams {
    page?: number
    title?: string
}

export type GetDiscovers = (params?: DiscoversParams, signal?: AbortSignal | undefined) => Promise<GetDiscoversResponse>
export type DeleteDiscover = (id: string) => Promise<DeleteDiscoversResponse>
export type CreateDiscover = (data: DataCreateDiscover) => Promise<CreateDiscoversResponse>
export type GetDiscover = (id: string, params?: DiscoversParams, signal?: AbortSignal | undefined) => Promise<GetDiscoverResponse>
export type EditDiscover = (id: string, data: DataCreateDiscover) => Promise<EditDiscoverResponse>

export type LoadDataDiscovers = (signal?: AbortSignal | undefined) => Promise<GetDiscoversResponse>
export type EditDataDiscovers = (id: string, data: DataCreateDiscover, additionalData: { movies: DataMovie[] }) => Promise<EditDiscoverResponse>

export type UseDiscovers = () => {
    data: DataDiscover[],
    setData: Dispatch<DataDiscover[]>,
    deleteData: DeleteDiscover,
    createData: CreateDiscover,
    getData: GetDiscover,
    editData: EditDataDiscovers,
    setTotalData: Dispatch<number>,
    loadMoreData: () => Promise,
    loadData: LoadDataDiscovers,
    filter: { title: string },
    setFilter: Dispatch<{ title: string }>,
    dataSingle: DataDiscover
    loadMoreDataSingle: (id: string) => Promise
}

// pages & components
export interface DiscoversProps {
    data: DataDiscover[];
    total_data: number
}

export interface DiscoversEditProps {
    show: boolean;
}

export interface InitialStateDataDiscover {
    title: string,
}

interface InitialStateListPropertyDiscover {
    label: string;
    name_search: string;
    data_index_list: string;
}

export interface InitialStateListDiscover {
    movies: InitialStateListPropertyDiscover;
}

export interface InitialStateFilteredAndSelectedDataDiscover {
    movies: DataMovie[];
}

export interface DiscoversCreateProps {
    show: boolean;
}