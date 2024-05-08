import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import useSignIn from './useSignIn';
import useToggle from '../../hooks/useToggle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
interface SignInProps {}

const SignIn: FC<SignInProps> = () => {
  const { loginForm } = useSignIn();
  const [showPassword, togglePassword] = useToggle();
  const [rememberMe, , setRememberMe] = useToggle(true);

  return (
    <>
      <Typography component='h2' variant='h4' alignSelf='start'>
        Tasky
      </Typography>
      <Typography component='h2' variant='h5' fontWeight='bold' alignSelf='start'>
        Log in to your Account
      </Typography>
      <Typography alignSelf='start' mb='2rem' color='#ccc'>
        Welcome back! Select method to log in:
      </Typography>
      <Box component='form' onSubmit={loginForm.handleSubmit}>
        <Grid container columns={12} spacing={2}>
          <Grid item xs={12}>
            <TextField
              name='email'
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              helperText={loginForm.errors && <span>{loginForm.errors.email}</span>}
              error={loginForm.errors.email !== undefined}
              label='Email'
              placeholder='Email'
              autoComplete={rememberMe ? 'on' : 'off'}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <MailOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={loginForm.handleChange}
              value={loginForm.values.password}
              name='password'
              helperText={loginForm.errors && <span>{loginForm.errors.password}</span>}
              error={loginForm.errors.password !== undefined}
              onKeyDown={(e) => {
                console.log(e.getModifierState('CapsLock'));
              }}
              fullWidth
              label='Password'
              placeholder='Password'
              type={showPassword ? 'text' : 'password'}
              autoComplete={rememberMe ? 'on' : 'off'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={togglePassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              justifyContent='space-between'
              alignItems='center'
              width='100%'
              display='flex'>
              <FormControlLabel
                control={
                  <Checkbox
                    value={rememberMe}
                    checked={rememberMe}
                    onChange={(_, value) => {
                      setRememberMe(value);
                    }}
                  />
                }
                label='Remember me'
              />
              <Link href='/forgot-password'>Forgot Password?</Link>
            </Box>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Button variant='contained' fullWidth type='submit'>
              Log In
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Typography mt='1.5rem'>
        Don't have an account?
        <Link href='/sign-up' ml='1rem' underline='hover'>
          Create an account
        </Link>
      </Typography>
    </>
  );
};

export default SignIn;
