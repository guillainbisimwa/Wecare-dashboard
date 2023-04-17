import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
// @mui
import { Grid, Container, Typography } from '@mui/material';
import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';


export default function DashboardAppPage() {
  const navigate = useNavigate();

  const { user, error, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Redirect the user to the dashboard page if they are already logged in
    if (!user) {
      console.log("navigate", user);

      navigate('/login', { replace: true });
    }
    // Add a default return value of undefined to the arrow function
    // since useEffect does not require a return value.
    // This will prevent the "Expected to return a value at the end of arrow function" error.
    return undefined;
  }, [user, navigate]);
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
