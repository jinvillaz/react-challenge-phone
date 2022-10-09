import { createReducer } from '@reduxjs/toolkit';
import { Contact } from '../../model/contact';
import { createContact, deleteContact, getContacts, setSearch, updateContact } from './contacts.actions';

interface ContactState {
  contacts: Contact[];
  search: string;
}

const initialState: ContactState = {
  contacts: [],
  search: '',
};

export const contactsReducer = createReducer(initialState, (builder) => {
  builder.addCase(getContacts.pending, (state) => ({
    ...state,
    contacts: [],
  }));

  builder.addCase(getContacts.rejected, (state) => ({
    ...state,
    contacts: [],
  }));

  builder.addCase(getContacts.fulfilled, (state, action) => ({
    ...state,
    contacts: action.payload,
  }));

  builder.addCase(setSearch, (state, action) => ({
    ...state,
    search: action.payload,
  }));

  builder.addCase(deleteContact.fulfilled, (state, action) => ({
    ...state,
    contacts: state.contacts.filter(contact => contact.id !== action.payload),
  }));

  builder.addCase(createContact.fulfilled, (state, action) => ({
    ...state,
    contacts: [...state.contacts, action.payload],
  }));

  builder.addCase(updateContact.fulfilled, (state, action) => {
    const tmp = [...state.contacts];
    const index = tmp.findIndex(contact => contact.id === action.payload.id);
    tmp[index] = action.payload;
    return {
      ...state,
      contacts: [...tmp],
    }
  });
});
