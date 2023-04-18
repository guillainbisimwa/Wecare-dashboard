import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Container, Typography, Card, Stack, Avatar, Box, Divider } from '@mui/material';
import Iconify from '../components/iconify';

PatientProfile.propTypes = {
  color: PropTypes.string,
};

const USER = {
  _id:"63ee7558638f75180f35d492",
   name:"patient1",
   email:"patient1@wecare.com",
   phoneNumber:"0000000000",
   createdAt:"2023-02-16T18:26:32.727Z",
   updatedAt:"2023-04-11T10:20:56.049Z",
   __v:16,
   age:25,
   height:43,
   gender:"Male",
   weight:37,
   wallet:"6435348742fd34ad1f68ae88",
   id:"63ee7558638f75180f35d492"
};

export default function PatientProfile({color = 'customer'}) {

  return (
    <>
      <Helmet>
        <title> Profile Patient | We care </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 3 }}>
          Patient's Profile
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
                {USER.email}
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
                Gender
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ py: 1 }}>
                {USER.gender}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Iconify icon="akar-icons:phone" width={20} height={20} />
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Age
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ py: 1 }}>
                {USER.age} years old
              </Typography>

              <Divider sx={{ my: 2 }} />


              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Iconify icon="akar-icons:phone" width={20} height={20} />

                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                Height
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ py: 1 }}>
                {USER.height} m
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Iconify icon="akar-icons:phone" width={20} height={20} />

                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                Weight
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ py: 1 }}>
                {USER.weight} kg
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
