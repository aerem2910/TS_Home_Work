export type MyPartial<T> = {
    [K in keyof T]?: T[K];
};

export type MyReadonly<T> = {
    readonly [K in keyof T]: T[K];
};

export type MyNonNullable<T> = T extends null | undefined ? never : T;

export type StringKeys<T> = {
    [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];
