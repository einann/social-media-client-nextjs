export const transformRequest = (rawRequest: string, orderBy: string = "", take: string = "0", skip: string = "0") => {
    const filter: { field: string; operation: string; value: string; group: string; }[] = [];
    if (rawRequest) {
        rawRequest.split("&").forEach(part => {
            ["==", "!=", "<=", ">=", "<<", ">>", "%", "%=", "=%"].forEach(operation => {
                if (part.split(operation).length > 1) {
                    const [field, value] = [part.split(operation)[0], part.split(operation)[1]];
                    filter.push({
                        field,
                        operation,
                        value,
                        group: "AND_01"
                    })
                }
            })
        })
    }
    else {
        return {
            "filter": "GETALL",
            orderBy,
            take,
            skip,
        }
    }

    return {
        filters: filter,
        orderBy,
        take,
        skip,
    };
}
