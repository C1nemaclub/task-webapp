import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import { useContext } from 'react';
import InputField from '../../components/shared/input-field';
import { AuthContext } from '../../context/auth/auth-context';
import useToggle from '../../hooks/useToggle';
import usePasswordConfirmReset from './use-password-confirm-reset';
const PasswordConfirmReset = () => {
  const passwordResetForm = usePasswordConfirmReset();
  const { loading } = useContext(AuthContext);
  const [showPassword, togglePassword] = useToggle();
  return (
    <>
      <Stack maxWidth={450}>
        <Typography component='h2' variant='h5' textAlign='center' mb={2}>
          Reset Password
        </Typography>
        <Typography component='p' textAlign='center' mb={4}>
          Forgot your password? No worries. Please enter your new password and confirm it
          below to reset securely.
        </Typography>
        <Box component='form' onSubmit={passwordResetForm.handleSubmit}>
          <Grid container columns={12} spacing={2}>
            <Grid item xs={12}>
              <InputField
                form={passwordResetForm}
                name='password'
                label='New Password'
                placeholder='New Password'
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
            <Grid item xs={12}>
              <InputField
                form={passwordResetForm}
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
            <Grid item xs={12} mt={2}>
              <Button
                variant='contained'
                fullWidth
                type='submit'
                disabled={loading || passwordResetForm.isSubmitting}>
                Reset Password
              </Button>
            </Grid>
          </Grid>
        </Box>
        {loading || passwordResetForm.isSubmitting === true ? (
          <Box display='flex' justifyContent='center' alignContent='center' mt={12}>
            <CircularProgress />
          </Box>
        ) : null}
      </Stack>
    </>
  );
};

export default PasswordConfirmReset;
