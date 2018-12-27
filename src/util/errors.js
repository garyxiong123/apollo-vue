/**
 * 
 * @param {Sting} type 正确的类型
 */
export const typeError = (type) => {
    throw new Error(`param type must be ${type}`);
}