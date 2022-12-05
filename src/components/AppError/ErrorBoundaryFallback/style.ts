import { Box, styled } from '@mui/material';

const InformationContainer = styled(Box)`
  padding: 12px;

  max-width: 40%;

  text-align: start;

  div:nth-of-type(2) {
    display: flex;
    justify-content: center;
    align-items: center;

    gap: 25px;

    margin-bottom: 12px;

    .MuiTypography-h3,
    .sad-face-icon {
      color: #445f77;
    }
  }

  .error-message-container {
    display: flex;
    justify-content: center;
    align-items: center;

    gap: 25px;

    margin-top: 16px;

    text-align: start;

    font-size: 1.15rem;

    code {
      padding: 12px;

      background-color: #f5f5f5;

      line-height: 1.5;
    }
  }
`;

export { InformationContainer };
