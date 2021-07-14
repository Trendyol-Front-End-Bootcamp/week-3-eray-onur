export function addParamToUrl(url) {
    console.log(`Url to watch: ${url}`);
    return url.includes('?') ? '&' : '?';
}