import { FC } from 'react';

import { useAuthContext } from '@/hooks/useAuthContext';

import {
  AccountCircle,
  DoneOutline,
  PowerSettingsNewTwoTone,
  Sync,
} from '@mui/icons-material';

import { Button, Stack } from '@mui/material';

import UserModel from '@/models/user';

type OptionButtonsProps = {
  isFetching: boolean;
  user: UserModel | null;
  handleResendCode: () => void;
};

const OptionsButtons: FC<OptionButtonsProps> = ({
  user,
  isFetching,
  handleResendCode,
}) => {
  const { handleLogout } = useAuthContext();
  return (
    <Stack direction="row" spacing={2}>
      {!user ? (
        <Button
          id="button-submit"
          fullWidth
          type="submit"
          size="large"
          variant="outlined"
          disabled={isFetching}
          startIcon={<AccountCircle />}
        >
          Efetuar Login
        </Button>
      ) : (
        <>
          <Button
            id="resend-code"
            fullWidth
            type="button"
            size="large"
            variant="outlined"
            disabled={isFetching}
            startIcon={<Sync />}
            onClick={handleResendCode}
          >
            Reenviar
          </Button>
          <Button
            id="send-code"
            fullWidth
            type="submit"
            size="large"
            variant="outlined"
            disabled={isFetching}
            startIcon={<DoneOutline />}
          >
            Confirmar
          </Button>
          <Button
            id="logout"
            fullWidth
            type="button"
            size="large"
            variant="outlined"
            disabled={isFetching}
            startIcon={<PowerSettingsNewTwoTone />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      )}
    </Stack>
  );
};

export default OptionsButtons;
