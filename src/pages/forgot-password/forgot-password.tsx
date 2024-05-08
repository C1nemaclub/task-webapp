import { Button, Link, Typography } from '@mui/material';
import { useAuthContext } from '../../context/auth/auth-context';

const ForgotPassword = () => {
  const { forgotPassword } = useAuthContext();
  return (
    <>
      <h1>Forgot Password</h1>
      <Typography mt='1.5rem'>
        Already have an Account?
        <Link href='/sign-in' ml='1rem' underline='hover'>
          Sign In
        </Link>
        <Button
          onClick={() => {
            forgotPassword('santiagov801@gmail.com');
          }}>
          Recover Password
        </Button>
      </Typography>
    </>
  );
};

export default ForgotPassword;
