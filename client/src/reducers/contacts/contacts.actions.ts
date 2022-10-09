import { Contact, ContactBody } from '../../model/contact';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { contactService } from './contacts.service';

export const getContacts = createAsyncThunk<Contact[], string>(
  'contacts/getContacts',
  async (lastName: string): Promise<Contact[]> => {
    return await contactService.getAll(lastName);
  },
);

export const setSearch = createAction<string>(
  'contacts/setSearch',
);

export const getContactById = createAsyncThunk<Contact, string>(
  'contacts/getContactById',
  contactService.getById,
);

export const createContact = createAsyncThunk<Contact, ContactBody>(
  'contacts/createContact',
  async (data: ContactBody): Promise<Contact> => {
    return await contactService.create(data);
  },
);

interface UpdateData {
  id: string;
  data: ContactBody;
}

export const updateContact = createAsyncThunk<Contact, UpdateData>(
  'contacts/updateContact',
  async ({ id, data }): Promise<Contact> => {
    return await contactService.updateById(id, data);
  },
);

export const deleteContact = createAsyncThunk<string, string>(
  'contacts/deleteContact',
  contactService.deleteById,
);