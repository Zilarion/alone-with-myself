export type Route<
    TParams extends void | { [K: string]: string | undefined } = void,
> = {
    path: (params: TParams) => string;
};
