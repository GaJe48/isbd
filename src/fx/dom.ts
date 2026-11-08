type Root = ParentNode;

/** querySelector yang mengembalikan HTMLElement (slide selalu memakai selector yang ada). */
export const $ = <T extends Element = HTMLElement>(sel: string, root: Root = document): T => root.querySelector(sel) as T;

export const $$ = <T extends Element = HTMLElement>(sel: string, root: Root = document): T[] => [...root.querySelectorAll<T>(sel)];
