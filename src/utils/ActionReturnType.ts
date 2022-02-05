export type ActionReturnType<T> = T extends { [key: string]: (...args: any[]) => infer R } ? R : never;
