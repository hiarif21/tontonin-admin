import { Dispatch } from "react"
import { DataStreamingService } from "./streamingServices"

// others
export interface DataWatchOption {
    _id: string
    title: string
    link_streaming: string
    streaming_service: DataStreamingService
}

// response api
export interface GetWatchOptionsResponse {
    success: boolean,
    message: string,
    page: number
    total_page: number
    total_data: number
    data: [] | DataWatchOption[]
}

export interface DeleteWatchOptionsResponse {
    success: boolean,
    message: string,
}

export interface CreateWatchOptionsResponse {
    success: boolean,
    message: string,
    data: DataWatchOption | undefined
}

export interface GetWatchOptionResponse {
    success: boolean,
    message: string,
    data: DataWatchOption | undefined
}

export interface EditWatchOptionResponse {
    success: boolean,
    message: string,
}

// context & services
export interface DataCreateWatchOption {
    title: string
    link_streaming: string
    streaming_service: string
}

export interface WatchOptionsParams {
    page?: number
    title?: string
}

export type GetWatchOptions = (params?: WatchOptionsParams, signal?: AbortSignal | undefined) => Promise<GetWatchOptionsResponse>
export type DeleteWatchOption = (id: string) => Promise<DeleteWatchOptionsResponse>
export type CreateWatchOption = (data: DataCreateWatchOption) => Promise<CreateWatchOptionsResponse>
export type GetWatchOption = (id: string) => Promise<GetWatchOptionResponse>
export type EditWatchOption = (id: string, data: DataCreateWatchOption) => Promise<EditWatchOptionResponse>

export type LoadDataWatchOptions = (signal?: AbortSignal | undefined) => Promise<GetWatchOptionsResponse>
export type EditDataWatchOptions = (id: string, data: DataCreateWatchOption, additionalData: { streaming_services: DataStreamingService[] }) => Promise<EditWatchOptionResponse>

export type UseWatchOptions = () => {
    data: DataWatchOption[],
    setData: Dispatch<DataWatchOption[]>,
    deleteData: DeleteWatchOption,
    createData: CreateWatchOption,
    getData: GetWatchOption,
    editData: EditDataWatchOptions,
    setTotalData: Dispatch<number>,
    loadMoreData: () => Promise,
    loadData: LoadDataWatchOptions,
    filter: { title: string },
    setFilter: Dispatch<{ title: string }>,
}

// pages & components
export interface WatchOptionsProps {
    data: DataWatchOption[];
    total_data: number
}

export interface WatchOptionsEditProps {
    show: boolean;
}

export interface InitialStateDataWatchOption {
    title: string,
    link_streaming: string,
}

export interface InitialStateListWatchOption {
    label: string;
    value_search: string;
    name_search: string;
    data_list: DataStreamingService[];
    data_index_list: string;
}

export interface InitialStateFilteredAndSelectedDataWatchOption {
    streaming_services: DataStreamingService[];
}

export interface WatchOptionsCreateProps {
    show: boolean;
}