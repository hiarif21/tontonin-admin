import { type } from "os"
import { Dispatch } from "react"
import { DataRole } from "./roles"

// others
export interface DataPerson {
    _id: string
    name: string
    role: DataRole
}

// response api
export interface GetPersonsResponse {
    success: boolean,
    message: string,
    page: number
    total_page: number
    total_data: number
    data: [] | DataPerson[]
}

export interface DeletePersonsResponse {
    success: boolean,
    message: string,
}

export interface CreatePersonsResponse {
    success: boolean,
    message: string,
    data: DataPerson | undefined
}

export interface GetPersonResponse {
    success: boolean,
    message: string,
    data: DataPerson | undefined
}

export interface EditPersonResponse {
    success: boolean,
    message: string,
}

// context & services
export interface DataCreatePerson {
    name: string
    role: string
}

export interface PersonsParams {
    page?: number
    name?: string
}

export type GetPersons = (params?: PersonsParams, signal?: AbortSignal | undefined) => Promise<GetPersonsResponse>
export type DeletePerson = (id: string) => Promise<DeletePersonsResponse>
export type CreatePerson = (data: DataCreatePerson) => Promise<CreatePersonsResponse>
export type GetPerson = (id: string) => Promise<GetPersonResponse>
export type EditPerson = (id: string, data: DataCreatePerson) => Promise<EditPersonResponse>

export type LoadDataPersons = (signal?: AbortSignal | undefined) => Promise<GetPersonsResponse>
export type EditDataPersons = (id: string, data: DataCreatePerson, additionalData: { roles: DataRole[] }) => Promise<EditPersonResponse>

export type UsePersons = () => {
    data: DataPerson[],
    setData: Dispatch<DataPerson[]>,
    deleteData: DeletePerson,
    createData: CreatePerson,
    getData: GetPerson,
    editData: EditDataPersons,
    setTotalData: Dispatch<number>,
    loadMoreData: () => Promise,
    loadData: LoadDataPersons,
    filter: { name: string },
    setFilter: Dispatch<{ name: string }>,
}

// pages & components
export interface PersonsProps {
    data: DataPerson[];
    total_data: number
}

export interface PersonsEditProps {
    show: boolean;
}

export interface InitialStateDataPerson {
    name: string,
}

export interface InitialStateListPerson {
    label: string;
    value_search: string;
    name_search: string;
    data_list: DataRole[];
    data_index_list: string;
}

export interface InitialStateFilteredAndSelectedDataPerson {
    roles: DataRole[];
}

export interface PersonsCreateProps {
    show: boolean;
}