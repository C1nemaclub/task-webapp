import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useContext } from 'react';
import { AuthContext } from '../../context/auth/auth-context';
import useToggle from '../../hooks/useToggle';
import useSignUp from './useSignUp';
import Logo from '../../components/shared/logo';
import InputField from '../../components/shared/input-field';
import BadgeIcon from '@mui/icons-material/Badge';
import { Link as RouterLink } from 'react-router-dom';

interface SignUpProps {}

const SignUp: FC<SignUpProps> = () => {
  const { registerForm } = useSignUp();
  const { loading } = useContext(AuthContext);
  const [showPassword, togglePassword] = useToggle();

  console.log(registerForm.errors, 'HERE');

  return (
    <>
      <Logo title='Tasky' />
      <Typography
        component='h2'
        variant='h5'
        fontWeight='bold'
        alignSelf='start'></Typography>
      <Typography component='h2' variant='h5' fontWeight='bold' alignSelf='start'>
        Create an Account
      </Typography>
      <Typography alignSelf='start' mb='2rem' color='#ccc'>
        Welcome aboard! Register now and let's make magic happen together.
      </Typography>
      <Box component='form' onSubmit={registerForm.handleSubmit}>
        <Grid container columns={12} spacing={2}>
          <Grid item xs={12} lg={6}>
            <InputField
              form={registerForm}
              name='email'
              label='Email'
              placeholder='Email'
              autoComplete='off'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <MailOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <InputField
              form={registerForm}
              name='name'
              label='Name'
              placeholder='Name'
              autoComplete='off'
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <BadgeIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <InputField
              form={registerForm}
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
          <Grid item xs={12} lg={6}>
            <InputField
              form={registerForm}
              name='passwordConfirmation'
              label='Confirm Password'
              placeholder='Confirm Password'
              type={showPassword ? 'text' : 'password'}
              autoComplete='false'
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
          <Grid item lg={6} mr='auto' xs={12}>
            <Button
              variant='outlined'
              tabIndex={-2}
              startIcon={<UploadFileIcon />}
              fullWidth
              component='label'>
              Upload an Image
              <TextField
                helperText={
                  registerForm.errors && <span>{registerForm.errors.avatar}</span>
                }
                error={registerForm.errors.avatar !== undefined}
                style={{
                  clip: 'rect(0 0 0 0)',
                  clipPath: 'inset(50%)',
                  height: 1,
                  overflow: 'hidden',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  whiteSpace: 'nowrap',
                  width: 1,
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files !== null) {
                    const file = e.target.files[0];
                    registerForm.setFieldValue('avatar', file, true);
                  }
                }}
                name='avatar'
                type='file'
              />
            </Button>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Button
              variant='contained'
              fullWidth
              type='submit'
              disabled={loading || registerForm.isSubmitting}>
              Create Account
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Typography mt='1.5rem'>
        Already have an Account?
        <Link component={RouterLink} to='/auth/sign-in' ml='1rem' underline='hover'>
          Sign In
        </Link>
      </Typography>
    </>
  );
};

export default SignUp;
