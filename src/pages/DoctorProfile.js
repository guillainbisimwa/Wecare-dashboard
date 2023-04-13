import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Container, Typography, Card, Stack, Divider } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import Iconify from '../components/iconify';

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

DoctorProfile.propTypes = {
  color: PropTypes.string,
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
          <Grid item xs={12} sm={8} md={8}>
            <Card
              sx={{
                py: 5,
                boxShadow: 0,
                textAlign: 'center',
                color: (theme) => theme.palette[color].darker,
                bgcolor: (theme) => theme.palette[color].lighter,
              }}
              
            >
              <StyledIcon
                sx={{
                  color: (theme) => theme.palette[color].dark,
                  backgroundImage: (theme) =>
                    `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
                      theme.palette[color].dark,
                      0.24
                    )} 100%)`,
                }}
              >
                <Iconify icon="ant-design:android-filled" width={24} height={24} />
              </StyledIcon>

              <Typography variant="h3">Guy L full name</Typography>

              <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                holll
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4} md={4}>

          <Card
              sx={{
                py: 1,
                px: 1,
                boxShadow: 0,
                color: (theme) => theme.palette[color].darker,
                bgcolor: (theme) => theme.palette[color].lighter,
              }}
            >
            <Stack direction="row" spacing={3}>
              <Iconify icon="ant-design:android-filled" width={24} height={24} />
              <Typography variant="body2" sx={{ pt: 0.5 }}> 
                Street Num 12, South Africa
                Street Num 12, South Africa
              </Typography>
            </Stack>

            <Divider sx={{ my: 1 }}/>

            <Stack direction="row" spacing={3}>
              <Iconify icon="ant-design:android-filled" width={24} height={24} />
              <Typography variant="body2" sx={{ pt: 0.5 }}> 
                Street Num 12, South Africa
                Street Num 12, South Africa
              </Typography>
              
            </Stack>
              
            </Card>
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
