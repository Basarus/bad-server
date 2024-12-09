import BadRequestError from "../errors/bad-request-error";

export const sanitizeFilter = (filter: Record<string, any>) => {
    const forbiddenKeys = ['$expr', '$function', '$where'];
    Object.keys(filter).forEach((key) => {
        if (forbiddenKeys.includes(key)) {
            throw new BadRequestError(`Использование оператора ${key} запрещено`);
        }
        if (typeof filter[key] === 'object' && filter[key] !== null) {
            sanitizeFilter(filter[key]);
        }
    });
};
