interface NullObject {
  valueOf(): null
}

export const isVoid = (variable: unknown): variable is null | undefined | void | never | NullObject => 
  typeof variable === 'undefined' || (typeof variable === 'object' && (variable === null || variable.valueOf() === null));

export const isNotVoid = <T>(
  variable: T | null | undefined | void | never | NullObject,
): variable is T => !isVoid(variable)

export const isEmptyArray = <T>(array: T[]) => array.length === 0 ? true : false;