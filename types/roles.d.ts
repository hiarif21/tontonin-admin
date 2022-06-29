import { Dispatch } from "react"

// others
export interface DataRole {
    _id: string
    name: string
}

// response api
export interface GetRolesResponse {
    success: boolean,
    message: string,
    data: [] | DataRole[]
}

export interface DeleteRolesResponse {
    success: boolean,
    message: string,
}

export interface CreateRolesResponse {
    success: boolean,
    message: string,
    data: DataRole | undefined
}

export interface GetRoleResponse {
    success: boolean,
    message: string,
    data: DataRole | undefined
}

export interface EditRoleResponse {
    success: boolean,
    message: string,
}

// context & services
export type UseRoles = () => {
    data: DataRole[],
    setData: Dispatch<DataRole[]>,
    deleteData: DeleteRole,
    createData: CreateRole,
    getData: GetRole,
    editData: EditRole,
    loadData: GetRoles,
}

export interface DataCreateRole {
    name: string
}

export type GetRoles = () => Promise<GetRolesResponse>
export type DeleteRole = (id: string) => Promise<DeleteRolesResponse>
export type CreateRole = (data: DataCreateRole) => Promise<CreateRolesResponse>
export type GetRole = (id: string) => Promise<GetRoleResponse>
export type EditRole = (id: string, data: DataCreateRole) => Promise<EditRoleResponse>

// pages & components
export interface RolesProps {
    data: DataRole[];
}

export interface RolesEditProps {
    show: boolean;
}

export interface RolesCreateProps {
    show: boolean;
}