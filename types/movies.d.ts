import { Dispatch } from "react"
import { DataGenre } from "./genres"
import { DataPerson } from "./persons"
import { DataStreamingService } from "./streamingServices"
import { DataWatchOption } from "./watchOptions"

// others
export interface DataMovie {
    _id: string
    title: string
    image: string
    release_year: number
    runtime: string
    storyline: string
    link_trailer: string
    watch_options: DataWatchOption[]
    persons: DataPerson[]
    genres: DataGenre[]
}

// response api
export interface GetMoviesResponse {
    success: boolean,
    message: string,
    page: number
    total_page: number
    total_data: number
    data: [] | DataMovie[]
}

export interface DeleteMoviesResponse {
    success: boolean,
    message: string,
}

export interface CreateMoviesResponse {
    success: boolean,
    message: string,
    data: DataMovie | undefined
}

export interface GetMovieResponse {
    success: boolean,
    message: string,
    data: DataMovie | undefined
}

export interface EditMovieResponse {
    success: boolean,
    message: string,
}

// context & services
export interface DataCreateMovie {
    title: string
    image: string
    release_year: number
    runtime: string
    storyline: string
    link_trailer: string
    watch_options: string[]
    persons: string[]
    genres: string[]
}

export interface MoviesParams {
    page?: number
    title?: string
}

export type GetMovies = (params?: MoviesParams, signal?: AbortSignal | undefined) => Promise<GetMoviesResponse>
export type DeleteMovie = (id: string) => Promise<DeleteMoviesResponse>
export type CreateMovie = (data: DataCreateMovie) => Promise<CreateMoviesResponse>
export type GetMovie = (id: string) => Promise<GetMovieResponse>
export type EditMovie = (id: string, data: DataCreateMovie) => Promise<EditMovieResponse>

export type LoadDataMovies = (signal?: AbortSignal | undefined) => Promise<GetMoviesResponse>
export type EditDataMovies = (id: string, data: DataCreateMovie, additionalData: { watch_options: DataWatchOption[], persons: DataPerson[], genres: DataGenre[] }) => Promise<EditMovieResponse>

export type UseMovies = () => {
    data: DataMovie[],
    setData: Dispatch<DataMovie[]>,
    deleteData: DeleteMovie,
    createData: CreateMovie,
    getData: GetMovie,
    editData: EditDataMovies,
    setTotalData: Dispatch<number>,
    loadMoreData: () => Promise,
    loadData: LoadDataMovies,
    filter: { title: string },
    setFilter: Dispatch<{ title: string }>,
}

// pages & components
export interface MoviesProps {
    data: DataMovie[];
    total_data: number
}

export interface MoviesEditProps {
    show: boolean;
}

export interface InitialStateDataMovie {
    title: string,
    image: string,
    release_year: number,
    runtime: string,
    storyline: string,
    link_trailer: string,
}

interface InitialStateListPropertyMovie {
    label: string;
    label_2?: string;
    name_search: string;
    data_index_list: string;
    data_index_list_2?: string;
}

export interface InitialStateListMovie {
    watch_options: InitialStateListPropertyMovie;
    persons: InitialStateListPropertyMovie;
    genres: InitialStateListPropertyMovie & {
        value_search: string;
        data_list: DataGenre[];
    };
}

export interface InitialStateFilteredAndSelectedDataMovie {
    watch_options: DataWatchOption[];
    persons: DataPerson[];
    genres: DataGenre[];
}

export interface MoviesCreateProps {
    show: boolean;
}