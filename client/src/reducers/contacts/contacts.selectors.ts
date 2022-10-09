import { RootState } from '../store';

export const selectContacts = (state: RootState) => state.contacts.contacts;

export const selectSearch = (state: RootState) => state.contacts.search;
