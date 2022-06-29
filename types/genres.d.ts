import { Dispatch } from "react"

// others
export interface DataGenre {
    _id: string
    name: string
}

// response api
export interface GetGenresResponse {
    success: boolean,
    message: string,
    data: [] | DataGenre[]
}

export interface DeleteGenresResponse {
    success: boolean,
    message: string,
}

export interface CreateGenresResponse {
    success: boolean,
    message: string,
    data: DataGenre | undefined
}

export interface GetGenreResponse {
    success: boolean,
    message: string,
    data: DataGenre | undefined
}

export interface EditGenreResponse {
    success: boolean,
    message: string,
}

// context & services
export interface DataCreateGenre {
    name: string
}

export type GetGenres = () => Promise<GetGenresResponse>
export type DeleteGenre = (id: string) => Promise<DeleteGenresResponse>
export type CreateGenre = (data: DataCreateGenre) => Promise<CreateGenresResponse>
export type GetGenre = (id: string) => Promise<GetGenreResponse>
export type EditGenre = (id: string, data: DataCreateGenre) => Promise<EditGenreResponse>

export type UseGenres = () => {
    data: DataGenre[],
    setData: Dispatch<DataGenre[]>,
    deleteData: DeleteGenre,
    createData: CreateGenre,
    getData: GetGenre,
    editData: EditGenre,
    loadData: GetGenres,
}

// pages & components
export interface GenresProps {
    data: DataGenre[];
}

export interface GenresEditProps {
    show: boolean;
}

export interface GenresCreateProps {
    show: boolean;
}