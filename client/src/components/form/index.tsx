import { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, FormikHelpers, FormikProps, Form, Field } from 'formik';
import { validationSchema } from './schema';
import { FormTextField } from './form-text-field';
import { useAppDispatch } from '../../reducers/hooks';
import { createContact, updateContact } from '../../reducers/contacts/contacts.actions';
import { ContactBody } from '../../model/contact';
import { contactService } from '../../reducers/contacts/contacts.service';

export const FormCard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [cardId] = useState<string | undefined>(id);
  let title = 'Add new contact';
  if (cardId) {
    title = 'Edit contact';
  }
  const initValues: ContactBody = {
    firstName: '',
    lastName: '',
    phone: '',
  };

  const [contact, setContact] = useState<ContactBody>(initValues);

  const onSubmit = async (values: ContactBody, formikHelpers: FormikHelpers<ContactBody>) => {
    setContact(values);
    if (id) {
      dispatch(updateContact({ id, data: values }));
    } else {
      dispatch(createContact(values));
    }
    formikHelpers.setSubmitting(false);
    navigate('/');
  };

  const goHome = () => {
    navigate('/');
  };

  useEffect(() => {
    if (cardId) {
      const fetchData = async (id: string) => {
        const data = await contactService.getById(id);
        setContact({ firstName: data.firstName, lastName: data.lastName, phone: data.phone});
      };
      fetchData(cardId);
    }
  }, [cardId]);

  return (
    <Grid container>
      <Grid item xs={6} textAlign="left" sx={{ paddingLeft: '25px', paddingTop: '30px' }}>
        <Box display="flex" justifyContent="flex-start" alignItems="center" minHeight="100%">
          <Typography variant="h4">{title}</Typography>
        </Box>
      </Grid>
      <Grid item xs={6} sx={{ paddingTop: '30px', paddingRight: '25px' }}>
        <Box display="flex" justifyContent="flex-end" alignItems="center" minHeight="100%">
          <Button variant="contained" onClick={goHome}>
            Return to list
          </Button>
        </Box>
      </Grid>
      <Container sx={{ flexGrow: 1, padding: 5 }}>
        <Formik
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          initialValues={contact}
        >
          {(formikProps: FormikProps<ContactBody>) => (
            <Form noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field name="firstName" label="FirstName" fullWidth component={FormTextField} />
                </Grid>
                <Grid item xs={12}>
                  <Field name="lastName" label="LastName" fullWidth component={FormTextField} />
                </Grid>
                <Grid item xs={12}>
                  <Field name="phone" label="Phone" fullWidth component={FormTextField} />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    color="primary"
                    disabled={formikProps.isSubmitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    </Grid>
  );
};
