import { Contact, ContactBody } from './../../model/contact';
import axios from 'axios';

const baseURL = 'http://localhost:4000/api/contacts';

class ContactService {

  async getAll(lastName: string): Promise<Contact[]> {
    let api = baseURL;
    if (lastName !== '') {
      api += `?lastName=${lastName}`;
    }
    const { data } = await axios.get(api);
    return data;
  }

  async getById(id: string): Promise<Contact> {
    const { data } = await axios.get(`${baseURL}/${id}`);
    return data;
  }

  async create(body: ContactBody): Promise<Contact> {
    const { data } = await axios.post(baseURL, body);
    return data;
  }

  async updateById(id: string, body: ContactBody): Promise<Contact> {
    const { data } = await axios.put(`${baseURL}/${id}`, body);
    return data;
  }

  async deleteById(id: string): Promise<string> {
    const { data } = await axios.delete(`${baseURL}/${id}`);
    return data;
  }
}

export const contactService = new ContactService();
