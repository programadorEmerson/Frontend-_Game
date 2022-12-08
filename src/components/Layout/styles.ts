import { Box, styled } from '@mui/material';

export const ContainerLayout = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.default};
`;
