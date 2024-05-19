import { Box, Stack, StackProps, Typography, TypographyProps } from '@mui/material';
import LogoImage from '../../assets/task.svg';

type LogoProps = {
  title?: string;
  textProps?: TypographyProps;
  stackProps?: StackProps;
};

const Logo = ({ title, textProps, stackProps }: LogoProps) => {
  return (
    <>
      <Stack
        spacing={2}
        direction='row'
        justifyContent='start'
        width='100%'
        mb={1}
        {...stackProps}>
        <Box
          component='img'
          sx={{
            height: '100%',
            width: 40,
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
