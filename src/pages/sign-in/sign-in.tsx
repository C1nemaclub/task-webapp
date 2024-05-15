import GithubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { FC, useContext } from 'react';
import CustomButton from '../../components/shared/CustomButton';
import InputField from '../../components/shared/input-field';
import Logo from '../../components/shared/logo';
import { AuthContext } from '../../context/auth/auth-context';
import useToggle from '../../hooks/useToggle';
import useSignIn from './useSignIn';
import { Link as RouterLink } from 'react-router-dom';

interface SignInProps {}

const SignIn: FC<SignInProps> = () => {
  const { loading, authWithProvider } = useContext(AuthContext);
  const { loginForm } = useSignIn();
  const [showPassword, togglePassword] = useToggle();
  const [rememberMe, , setRememberMe] = useToggle(true);

  return (
    <>
      <Logo title='Tasky' />
      <Typography component='h2' variant='h5' fontWeight='bold' alignSelf='start'>
        Log in to your Account
      </Typography>
      <Typography alignSelf='start' mb='2rem' color='#ccc'>
        Welcome back! Select method to log in:
      </Typography>
      <Box component='form' onSubmit={loginForm.handleSubmit}>
        <Grid container columns={12} spacing={2}>
          <Grid item xs={12}>
            <InputField
              form={loginForm}
              name='email'
              label='Email'
              placeholder='Email'
              autoComplete={rememberMe ? 'on' : 'off'}
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
            <InputField
              form={loginForm}
              name='password'
              label='Password'
              placeholder='Password'
              type={showPassword ? 'text' : 'password'}
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
              <Link component={RouterLink} to='/auth/forgot-password'>
                Forgot Password?
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} mt={2}>
            <CustomButton
              variant='contained'
              fullWidth
              type='submit'
              loading={loading || loginForm.isSubmitting}>
              {loading || loginForm.isSubmitting ? 'Logging In' : 'Log In'}
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
      <Typography component='p'>or</Typography>
      <Stack direction='row' spacing={4}>
        <CustomButton
          disabled={loading || loginForm.isSubmitting}
          startIcon={<GoogleIcon />}
          variant='outlined'
          onClick={() => authWithProvider('google')}>
          Google
        </CustomButton>
        <CustomButton
          disabled={loading || loginForm.isSubmitting}
          startIcon={<GithubIcon />}
          variant='outlined'
          onClick={() => authWithProvider('github')}>
          Github
        </CustomButton>
      </Stack>
      <Typography mt='1.5rem'>
        Don't have an account?
        <Link component={RouterLink} to='/auth/sign-up' ml='1rem' underline='hover'>
          Create an account
        </Link>
      </Typography>
    </>
  );
};

export default SignIn;
