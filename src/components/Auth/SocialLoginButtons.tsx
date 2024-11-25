import React from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { Github, Mail, Facebook } from 'lucide-react';

interface SocialLoginButtonsProps {
  onLogin: (provider: string) => Promise<void>;
  isLoading: boolean;
  isRegister?: boolean;
}

export const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  onLogin,
  isLoading,
  isRegister = false,
}) => {
  const providers = [
    {
      name: 'Google',
      icon: <Mail size={20} />,
      color: '#DB4437',
      hoverColor: '#C13B2F',
    },
    {
      name: 'GitHub',
      icon: <Github size={20} />,
      color: '#333333',
      hoverColor: '#24292E',
    },
    {
      name: 'Facebook',
      icon: <Facebook size={20} />,
      color: '#4267B2',
      hoverColor: '#385899',
    },
  ];

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        {providers.map((provider) => (
          <Button
            key={provider.name}
            fullWidth
            variant="contained"
            startIcon={!isLoading && provider.icon}
            onClick={() => onLogin(provider.name)}
            disabled={isLoading}
            sx={{
              backgroundColor: provider.color,
              '&:hover': {
                backgroundColor: provider.hoverColor,
              },
              color: 'white',
              position: 'relative',
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <Typography variant="button" noWrap>
                {provider.name}
              </Typography>
            )}
          </Button>
        ))}
      </Box>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
        By continuing, you agree to our{' '}
        <Typography
          component="a"
          href="#"
          variant="body2"
          color="primary"
          sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Terms of Service
        </Typography>{' '}
        and{' '}
        <Typography
          component="a"
          href="#"
          variant="body2"
          color="primary"
          sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Privacy Policy
        </Typography>
      </Typography>
    </>
  );
};