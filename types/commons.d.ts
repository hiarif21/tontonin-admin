import { ChangeEvent, ReactNode } from "react";

// atoms
export interface IconsProps {
    icon:
    | 'Close'
    | 'Dashboard'
    | 'Discovers'
    | 'Genres'
    | 'Menu'
    | 'Movies'
    | 'Persons'
    | 'Roles'
    | 'Streaming Services'
    | 'Watch Options'
    | 'Edit'
    | 'Delete'
    | 'Plus'
    | 'Back'
    | 'Minus Circle'
    | 'Plus Circle';
    size?: 'default' | 'small' | 'smallest';
    color?: 'default' | 'primary' | 'secondary' | 'danger' | 'white';
}

export interface InputProps {
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
    value: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    min?: number;
}

export interface ModalProps {
    show: boolean;
    children: ReactNode;
    onClickOutside?: (event: MouseEvent) => void;
    _ref?: RefObject<HTMLElement>;
}

export interface TableDataProps {
    children: ReactNode;
    title?: string;
}

export interface TableHeaderProps {
    children: ReactNode;
}

// molecules
export interface SidebarItemProps {
    icon: ReactNode;
    title: string;
    onClick: () => void;
    active?: boolean;
}

export interface AddButtonStaticProps {
    title: string;
    onClick?: () => void;
}

export interface AlertDeleteProps {
    data: string;
    show: boolean;
    onClick: (x: boolean) => void;
}

export interface AutoCompleteProps {
    label: string;
    valueSearch: string;
    nameSearch: string;
    onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
    dataList: any;
    dataIndexList: string;
    onDeleteList: (x: string) => void;
    onClickList: (val: any, name: string) => void;
    selectedData: any;
}

export interface HeaderCreateAndEditProps {
    type: 'Edit' | 'Create';
    onSubmit: () => void;
    onBack: () => void;
}

export interface SearchFieldProps extends InputProps { }

export interface TableProps {
    columns: any[];
    dataSource: any[];
}

export interface TextFieldProps extends InputProps {
    label: string;
}