export type DataUser = {
    email: string;
    id: number;
    name: string;
}

export type ResponseCrud = {
    status: number;
    error?: string;
    data: DataUser[]    
    success?: boolean;
}