import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Container, Typography } from '@mui/material';
import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';



export default function DashboardAppPage() {

  const { list, errorDoctor, isLoadingDoctor } = useSelector((state) => state.doctors);

  return (
    <>
      <Helmet>
        <title> Dashboard | We care </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 3 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Doctors" total={12} icon={'ant-design:user-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Patients" total={200} color="error" icon={'ant-design:user-outlined'} />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
