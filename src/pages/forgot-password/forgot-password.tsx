import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import useForgotPassword from './use-forgot-password';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const ForgotPassword = () => {
  const { forgotPasswordForm } = useForgotPassword();
  return (
    <>
      <Stack maxWidth={450}>
        <Typography component='h2' variant='h5' textAlign='center' mb={2}>
          Forgot Password
        </Typography>
        <Typography component='p' textAlign='center' mb={4}>
          Lost your password? Click below to reset it and get back to your account.
        </Typography>
      </Stack>
      <Box component='form' onSubmit={forgotPasswordForm.handleSubmit}>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12}>
            <TextField
              name='email'
              value={forgotPasswordForm.values.email}
              onChange={forgotPasswordForm.handleChange}
              onBlur={forgotPasswordForm.handleBlur}
              helperText={
                forgotPasswordForm.errors && (
                  <span>{forgotPasswordForm.errors.email}</span>
                )
              }
              error={forgotPasswordForm.errors.email !== undefined}
              label='Email'
              placeholder='Email'
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
            <Button type='submit' fullWidth>
              Recover Password
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Typography mt='1.5rem' textAlign='center'>
        Already have an Account?
        <Link href='/auth/sign-in' ml='1rem' underline='hover'>
          Sign In
        </Link>
      </Typography>
    </>
  );
};

export default ForgotPassword;
