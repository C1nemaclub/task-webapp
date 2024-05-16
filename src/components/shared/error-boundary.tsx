import { Typography } from '@mui/material';
import React from 'react';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.log(error, '🚀');
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // this.setState({ hasError: true });
    console.error(error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <Typography component='h1' variant='h3' className='text-center mt-12'>
          Something went wrong!
        </Typography>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
