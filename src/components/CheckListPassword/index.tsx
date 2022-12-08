import React, { FC } from 'react';

import dynamic from 'next/dynamic';

import { FormikContextType } from 'formik';

import { Info } from '@mui/icons-material';

import { Box, IconButton } from '@mui/material';

import { PopoverMessage } from '../PopoverMessage';

const PasswordChecklist = dynamic(import('react-password-checklist'), {
  ssr: false,
});

type CheckListPasswordProps = {
  handleOpenChecklistPass: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseChecklistPass: () => void;
  formik: FormikContextType<any>;
  anchorChecklist: HTMLElement | null;
  openedChecklist: boolean;
};

const CheckListPassword: FC<CheckListPasswordProps> = ({
  handleOpenChecklistPass: handlePopoverOpen,
  handleCloseChecklistPass: handlePopoverClose,
  formik,
  anchorChecklist: anchorEl,
  openedChecklist: open,
}) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="flex-start">
      Senha inválida
      <IconButton
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <Info sx={{ fontSize: '1rem' }} />
      </IconButton>
      <PopoverMessage
        anchorEl={anchorEl}
        handlePopoverClose={handlePopoverClose}
        open={open}
      >
        <PasswordChecklist
          rules={['minLength', 'specialChar', 'number', 'capital', 'lowercase']}
          minLength={8}
          value={formik.values.password}
          valueAgain={formik.values.passwordConfirm}
          messages={{
            minLength: 'Conter no mínimo 8 dígitos.',
            specialChar: 'Conter um caracter especial',
            number: 'Conter um número',
            capital: 'Conter uma letra maiúscula',
            lowercase: 'Conter uma letra minúscula',
          }}
        />
      </PopoverMessage>
    </Box>
  );
};

export default CheckListPassword;
