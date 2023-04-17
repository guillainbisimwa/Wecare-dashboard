import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Container, Typography, Card, Stack, Avatar, Box, Divider } from '@mui/material';
import Iconify from '../components/iconify';

DoctorProfile.propTypes = {
  color: PropTypes.string,
};

const USER = {
  location: {
      type: "Point",
      coordinates: [
          78.3680644,
          17.4571169
      ]
  },
  _id: "6422ff3e10b8de2298e29ef3",
  name: "Mohit Singh",
  email: "mohitsingh2004245@gmail.com",
  phoneNumber: "7225965651",
  designation: "GP",
  createdAt: "2023-03-28T14:52:46.741Z",
  updatedAt: "2023-03-28T14:52:46.741Z",
  address:"Street SOUTH AFRICA",
  practiceNumber:"17",
  __v: 0,
  id: "6422ff3e10b8de2298e29ef3"
};

export default function DoctorProfile({color = 'primary'}) {

  return (
    <>
      <Helmet>
        <title> Profile Doctor | We care </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 3 }}>
          Doctor's Profile
        </Typography>

        <Grid container spacing={3}>

          <Grid item xs={12} md={7} >
            <Card
              sx={{
                py: 5,
                boxShadow: 0,
                textAlign: 'center',
                color: (theme) => theme.palette[color].darker,
                bgcolor: (theme) => theme.palette[color].lighter,
              }}
            >
              <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Avatar sx={{ width: 120, height: 120, fontSize: 48 }}>
                  {USER.name.charAt(0)}
                </Avatar>
              </Box>

              <Typography variant="h3" sx={{ mt: 3 }}>
                {USER.name}
              </Typography>

              <Typography variant="subtitle2" sx={{ opacity: 0.72, mt: 1 }}>
                {USER.address}
              </Typography>

              <Stack sx={{display: 'flex', mt:3, justifyContent: 'center', alignItems: 'center'}} direction="row" spacing={1} >
                <Iconify icon="akar-icons:phone" width={24} height={24} />
                <Typography variant="body2">{USER.phoneNumber}</Typography>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} sm={5} md={5}>
            <Card
              sx={{
                py: 5,
                px: 5,
                boxShadow: 0,
                color: (theme) => theme.palette[color].darker,
                bgcolor: (theme) => theme.palette[color].lighter,
              }}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Iconify icon="akar-icons:phone" width={20} height={20} />
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  E-mail
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ py: 1 }}>
                {USER.email}
              </Typography>

              <Divider sx={{ my: 2 }} />


              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Iconify icon="akar-icons:phone" width={20} height={20} />

                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                Designation
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ py: 1 }}>
                {USER.designation}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Iconify icon="akar-icons:phone" width={20} height={20} />

                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                practiceNumber
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ py: 1 }}>
                {USER.practiceNumber}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Iconify icon="akar-icons:phone" width={20} height={20} />

                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                Created At
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ py: 1 }}>
                {USER.createdAt}
              </Typography>
              
                
            </Card>
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
