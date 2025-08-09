function serializeBigIntToNumber<T>(data: T): T {
    return JSON.parse(JSON.stringify(data, (key, value) => {
        if (typeof value === 'bigint') {
            return value.toString();
        }
        return value;
    }));
}

export default serializeBigIntToNumber;
