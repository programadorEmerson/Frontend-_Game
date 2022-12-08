import { styled, Typography } from '@mui/material';

export const ListTitle = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1, 2, 0, 2),
  fontWeight: 900,
  color: theme.palette.primary.main,
}));
