import { Dispatch } from "react"

// others
export interface DataStreamingService {
    _id: string
    name: string
}

// response api
export interface GetStreamingServicesResponse {
    success: boolean,
    message: string,
    data: [] | DataStreamingService[]
}

export interface DeleteStreamingServicesResponse {
    success: boolean,
    message: string,
}

export interface CreateStreamingServicesResponse {
    success: boolean,
    message: string,
    data: DataStreamingService | undefined
}

export interface GetStreamingServiceResponse {
    success: boolean,
    message: string,
    data: DataStreamingService | undefined
}

export interface EditStreamingServiceResponse {
    success: boolean,
    message: string,
}

// context & services
export type UseStreamingServices = () => {
    data: DataStreamingService[],
    setData: Dispatch<DataStreamingService[]>,
    deleteData: DeleteStreamingService,
    createData: CreateStreamingService,
    getData: GetStreamingService,
    editData: EditStreamingService,
    loadData: GetStreamingServices,
}

export interface DataCreateStreamingService {
    name: string
}

export type GetStreamingServices = () => Promise<GetStreamingServicesResponse>
export type DeleteStreamingService = (id: string) => Promise<DeleteStreamingServicesResponse>
export type CreateStreamingService = (data: DataCreateStreamingService) => Promise<CreateStreamingServicesResponse>
export type GetStreamingService = (id: string) => Promise<GetStreamingServiceResponse>
export type EditStreamingService = (id: string, data: DataCreateStreamingService) => Promise<EditStreamingServiceResponse>

// pages & components
export interface StreamingServicesProps {
    data: DataStreamingService[];
}

export interface StreamingServicesEditProps {
    show: boolean;
}

export interface StreamingServicesCreateProps {
    show: boolean;
}