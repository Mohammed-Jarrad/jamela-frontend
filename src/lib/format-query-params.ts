export function formatQueryParams(paramsObject: { [key: string]: any }) {
    const formattedParams: { [key: string]: any } = {}
    Object.entries(paramsObject).forEach(([key, value]) => {
        if (typeof value === 'object') {
            Object.entries(value).forEach(([subKey, subValue]) => {
                formattedParams[`${key}[${subKey}]`] = subValue
            })
        } else {
            formattedParams[key] = value
        }
    })
    return formattedParams
}
