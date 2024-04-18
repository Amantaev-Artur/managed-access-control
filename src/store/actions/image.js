import axios from 'axios';
import config from '@/config';

export default {
  async uploadImage({ commit }, file) {
    const formData = new FormData();
    formData.append('picture', file);
    try {
      const response = await axios.post(`${config.fileServiceApiUrl}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      commit('setImage', response.data);
    } catch (error) {
      commit('handleError', { action: 'uploadImage', error });
    }
  }
}