import axios from 'axios';

const baseURL = 'http://localhost:8000/api/contacts';

export interface ContactBody {
  firstName: string;
  lastName: string;
  phone: string;
}

class ContactService {

  async getAll(lastName?: string) {
    let api = baseURL;
    if (lastName) {
      api += `?lastName=${lastName}`;
    }
    const { data } = await axios.get(api);
    return data;
  }

  async getById(id: string) {
    const { data } = await axios.get(`${baseURL}/${id}`);
    return data;
  }

  async post(body: ContactBody) {
    const { data } = await axios.post(baseURL, body);
    return data;
  }

  async updateById(id: string, body: ContactBody) {
    const { data } = await axios.put(`${baseURL}/${id}`, body);
    return data;
  }

  async deleteById(id: string) {
    const { data } = await axios.delete(`${baseURL}/${id}`);
    return data;
  }
}

export const contactService = new ContactService();
