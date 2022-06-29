export interface DataDashboard {
    discovers: number;
    movies: number;
    persons: number;
    streaming_services: number;
}

export interface DashboardProps {
    data: DataDashboard
}

export interface DashboardTemplateProps extends DashboardProps { }
export interface CardsProps {
    data: {
        content: any;
    }[];
}