import axios from 'axios';

export const fetchAllCharacters = async (url) => {
    try {
        return await axios.get(url);
    } catch(err) {
        return Promise.reject(err);
    }
}

