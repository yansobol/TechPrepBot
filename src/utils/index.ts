export function isValidJson(str: string) {
    try {
        const data = JSON.parse(str);
        return data;
    } catch (error) {
        return false;
    }
}