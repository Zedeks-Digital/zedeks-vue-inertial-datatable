export function useStr() {
    /*
 * string convertor and formatter
 * */
    const toTitle = (text => {
        text = text.replace(/_/g, " ")
        const arr = text.split(" ");
        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        return arr.join(" ")
    })
    const toSlug = (text, separator = "-") =>
        text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, separator)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    const removeSlug = (text) => {
        return text
            .toString()
            .replace(/-/g, ' ') // Replace hyphens with spaces
            .replace(/[^a-zA-Z0-9\s]/g, ' ') // Remove non-alphanumeric characters except spaces
            .trim(); // Trim leading and trailing spaces
    };

    return {toSlug, removeSlug, toTitle}
}