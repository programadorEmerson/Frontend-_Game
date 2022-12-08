import { styled, Alert, Box } from '@mui/material';

const AlertRoot = styled(Alert)(({ theme }) => ({
  backgroundColor: 'white',
  border: `1px solid ${theme.palette.grey[50]}`,
  boxShadow: '1px 1px 1px 1px rgb(0 0 0 / 10%)',
}));

const ContentContainer = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  minWidth: '15rem',
  height: '100%',
  minHeight: '2.8rem',
  gap: 8,
  justifyContent: 'center',
  alignItems: 'center',
}));

export { AlertRoot, ContentContainer };
