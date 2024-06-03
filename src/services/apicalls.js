import axios from 'axios'
const urlBase = 'http://localhost:3000'

export const GetPlaylistByID = async (id) => {
    try {
        const formData = new FormData();
        formData.append('player', id);
        const response = await axios.get(`${urlBase}/calendarevent`, {
            params: {
              player: id
            }
          });
        return response.data;
    } catch (error) {

    }
}
