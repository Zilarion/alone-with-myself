export type Route<
    TParams extends void | { [K: string]: string | undefined } = void,
> = {
    createPath: (params: TParams) => string;
    routes?: { [K: string]: Route<any> };
    path: string;
    element: React.ReactElement;
};
