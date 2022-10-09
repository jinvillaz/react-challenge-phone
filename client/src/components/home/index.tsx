import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Search, Clear, ContactPhone, Phone } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ConfirmationDialog } from '../dialog';
import { Contact } from '../../model/contact';
import { selectContacts, selectSearch } from '../../reducers/contacts/contacts.selectors';
import { deleteContact, getContacts, setSearch } from '../../reducers/contacts/contacts.actions';
import { useAppDispatch, useAppSelector } from '../../reducers/hooks';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  const search = useAppSelector(selectSearch);
  const [showClearIcon, setShowClearIcon] = useState<string>('none');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<string|undefined>();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const val = event.target.value;
    setShowClearIcon(val === '' ? 'none' : 'flex');
    dispatch(setSearch(val));
  };

  const clearValue = async (): Promise<void> => {
    setShowClearIcon('none');
    dispatch(setSearch(''));
  };

  const goToForm = () => {
    navigate('/form');
  };

  const editContact = async (id: string) => {
    navigate(`/form/${id}`);
  };

  const removeContact = async () => {
    dispatch(deleteContact(itemToDelete as string));
    setOpenDialog(false);
  };

  const openConfirmationDialog = (id: string) => {
    setOpenDialog(true);
    setItemToDelete(id);
  };

  useEffect(() => {
    dispatch(getContacts(search));
  }, [dispatch, search]);

  return (
    <Grid
      container
      sx={{ height: '100%', flexFlow: 'column', paddingLeft: '50px', paddingRight: '50px' }}
    > 
      <ConfirmationDialog state={openDialog} deleteItem={removeContact} setOpen={setOpenDialog}/>
      <Grid container sx={{ height: '200px', width: '100%' }}>
        <Grid item xs={12} textAlign="center">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100%">
            <ContactPhone style={{ fontSize: '60px', paddingRight: '25px' }}/> <Typography variant="h2"> Phone Book App</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} textAlign="left">
          <Box display="flex" justifyContent="flex-start" alignItems="center" minHeight="100%">
            <Typography variant="h4">Contacts</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end" alignItems="center" minHeight="100%">
            <Button variant="contained" onClick={goToForm}>
              + Add Contact
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ height: '120px', width: '100%' }}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" alignItems="center" minHeight="100%">
            <TextField
              fullWidth
              variant="outlined"
              label="Search for contact by last name..."
              value={search}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="start" style={{ display: showClearIcon }} onClick={clearValue}>
                    <IconButton>
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ height: '100%', width: '100%', flexGrow: '1', overflowY: 'auto' }}>
        <Grid item xs={12}>
          <List>
            {contacts.map((item: Contact, index) => (
              <ListItem
                key={index}
                sx={{ border: 1, borderColor: 'grey.400' }}
                secondaryAction={
                  <Grid>
                    <Tooltip title="Edit">
                      <Button
                        aria-label="edit"
                        sx={{ minWidth: '40px', paddingLeft: 0, paddingRight: 0 }}
                        color="error"
                        variant="contained"
                        onClick={() => editContact(item.id)}
                      >
                        <EditIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <Button
                        color="error"
                        sx={{ minWidth: '40px', paddingLeft: 0, paddingRight: 0, marginLeft: '10px' }}
                        variant="contained"
                        onClick={() => openConfirmationDialog(item.id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </Tooltip>
                  </Grid>
                }
              >
                <ListItemText
                  disableTypography
                  primary={<Typography variant="h6">{item.firstName + ' ' + item.lastName}</Typography>}
                  secondary={
                    <Box style={{ display: 'flex', alignItems: 'center' }} color="grey.500">
                      <Phone sx={{ fontSize: 14 }} />
                      <Typography variant="body2">{item.phone}</Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
};
