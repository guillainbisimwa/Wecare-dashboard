import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Container, Typography } from '@mui/material';

export default function DoctorProfile() {

  return (
    <>
      <Helmet>
        <title> Profile Doctor | We care </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 3 }}>
          Dr Profile
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">
              1
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6"> 
              1
            </Typography>
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
