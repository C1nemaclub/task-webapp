import { CircularProgress } from '@mui/material';

const LoadingScreen = () => {
  return (
    <CircularProgress
      sx={{
        position: 'relative',
        top: '50%',
        left: '50%',
        marginTop: '-20px',
        marginLeft: '-20px',
      }}
    />
  );
};

export default LoadingScreen;
