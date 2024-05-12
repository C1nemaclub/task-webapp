import {
  Button,
  ButtonProps,
  CircularProgress,
  CircularProgressProps,
} from '@mui/material';

type CustomButton = ButtonProps & {
  loading?: boolean;
  loaderProps?: CircularProgressProps;
};

const CustomButton = ({
  loading,
  children,
  startIcon,
  loaderProps,
  ...props
}: CustomButton) => {
  return (
    <Button
      disabled={loading}
      startIcon={
        loading ? (
          <CircularProgress color='primary' size={20} {...loaderProps} />
        ) : (
          startIcon
        )
      }
      {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
