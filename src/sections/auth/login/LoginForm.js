import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';
import { login } from '../../../redux/loginAction';

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, error, isLoading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = (e) => {
    e.preventDefault();

        // dispatch(login(email, password));
        console.log("user1",user);
        console.log("error1",error);
        console.log("isLoading1",isLoading);

    dispatch(login(email, password));
    // dispatch(login(email, password));
    console.log("user",user);
    console.log("error",error);
    console.log("isLoading",isLoading);
   
  };

  if (user) {
    return  navigate('/dashboard', { replace: true });;
  }

  return (
    <>
      <Stack spacing={3}>
        {error &&  <Typography variant="h4" sx={{ mb: 3 }}>{error}</Typography>}
        
        <TextField name="email" label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
