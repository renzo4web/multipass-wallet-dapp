export const formatTransfers = (rawTransfers) => {

    return (rawTransfers.map(({id, amount, to, approvals, sent}) => ({
        id,
        amount,
        to,
        approvals,
        sent
    })).map((el ) => {
        let temp = {}

        for (const key in el) {
            el[key] = el[key]?._isBigNumber ? el[key].toString() : el[key];
            temp[key] = el[key]
        }

        return temp
    }))
}