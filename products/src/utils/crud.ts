export interface CRUD {
    getAll: (limit: number, page: number) => Promise<any>;
    create: (resource: any) => Promise<any>;
}