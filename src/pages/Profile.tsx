import React from 'react';
import { Container, Paper, Typography, Box, Avatar, Button, Grid, Chip, Divider } from '@mui/material';
import { Edit, PawPrint, Mail, MapPin } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Profile = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 12, mb: 6 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 4 }}>
          <Avatar
            src={user.avatar}
            alt={user.name}
            sx={{ width: 120, height: 120 }}
          />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Typography variant="h4" gutterBottom>
                  {user.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Mail size={16} />
                  {user.email}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                startIcon={<Edit size={16} />}
                size="small"
              >
                Edit Profile
              </Button>
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {user.bio}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip icon={<MapPin size={16} />} label="San Francisco, CA" />
              <Chip icon={<PawPrint size={16} />} label={`${user.pets.length} Pets`} />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>
          My Pets
        </Typography>
        <Grid container spacing={3}>
          {user.pets.map((pet) => (
            <Grid item xs={12} sm={6} md={4} key={pet.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'grey.50',
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: 200,
                    borderRadius: 1,
                    overflow: 'hidden',
                    mb: 2,
                  }}
                >
                  <img
                    src={pet.photo}
                    alt={pet.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
                <Typography variant="h6" gutterBottom>
                  {pet.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {pet.breed} • {pet.age} years old
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};