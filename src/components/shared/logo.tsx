import { Box, Stack, Typography, TypographyProps } from '@mui/material';
import LogoImage from '../../assets/task.svg';

type LogoProps = {
  title?: string;
  textProps?: TypographyProps;
};

const Logo = ({ title, textProps }: LogoProps) => {
  return (
    <>
      <Stack spacing={2} direction='row' justifyContent='start' width='100%' mb={1}>
        <Box
          component='img'
          sx={{
            height: '100%',
            width: 80,
          }}
          alt='Tasky logo'
          src={LogoImage}
        />
        {title && (
          <Typography
            component='h2'
            variant='h4'
            alignSelf='start'
            style={{
              marginTop: 'auto',
            }}
            {...textProps}>
            {title}
          </Typography>
        )}
      </Stack>
    </>
  );
};

export default Logo;
