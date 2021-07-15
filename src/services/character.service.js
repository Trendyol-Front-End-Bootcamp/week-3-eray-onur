import axios from 'axios';
export const fetchAllCharacters = async (url) => {
    return await axios.get(url);
}