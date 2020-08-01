import _ from "lodash";

export function paginate(products, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(products)
        .slice(startIndex)
        .take(pageSize)
        .value();
};