export function cleanString(string: string) {
    return string.split("\n").map(s => s.trim()).join("\n");
}