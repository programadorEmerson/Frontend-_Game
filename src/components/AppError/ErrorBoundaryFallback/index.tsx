import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { format } from 'date-fns';

import { InformationContainer } from '@/components/AppError/ErrorBoundaryFallback/style';
import { ErrorPageTemplate } from '@/components/AppError/ErrorPageTemplate';

import { ContentCopy } from '@mui/icons-material';
import { Typography, Box, Button, Tooltip } from '@mui/material';

import { CopyToClipboard } from 'react-copy-to-clipboard';

type ErrorBoundaryFallbackProps = {
  error: Error;
  resetErrorBoundary(): void;
};

export const ErrorBoundaryFallback: React.FC<ErrorBoundaryFallbackProps> = ({
  error,
}) => {
  const { asPath, back } = useRouter();

  const errorMsg = {
    message: error.message,
    url: asPath,
    datetime: format(new Date(), 'dd/MM/yyyy HH:mm:ss'),
  };

  return (
    <ErrorPageTemplate title="Ocorreu um erro inesperado!">
      <InformationContainer>
        <div>
          <Image src="/boundary_error.svg" alt="Error" objectFit="fill" />
        </div>
        <div>
          <Typography variant="h3">Desculpe!</Typography>
        </div>
        <div>
          <Typography variant="h5" paragraph>
            Ocorreu um erro na aplicação que não pode ser resolvido no momento.
          </Typography>
          <Typography variant="h6">
            Por favor, informe os dados relatados abaixo ao suporte técnico.
          </Typography>
          <div className="error-message-container">
            <code id="error-msg">
              <strong>Erro:</strong> {errorMsg.message} <br />
              <strong>Local:</strong> {errorMsg.url} <br />
              <strong>Horário:</strong> {errorMsg.datetime}
            </code>
            <CopyToClipboard text={JSON.stringify(errorMsg)}>
              <Tooltip title="Copiar mensagem de erro">
                <ContentCopy />
              </Tooltip>
            </CopyToClipboard>
          </div>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={2}
          >
            <Button
              variant="contained"
              onClick={back}
              style={{ backgroundColor: '#445f77' }}
            >
              Voltar
            </Button>
          </Box>
        </div>
      </InformationContainer>
    </ErrorPageTemplate>
  );
};
