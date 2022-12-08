/* eslint-disable react-hooks/exhaustive-deps */
import { FC, forwardRef, ReactElement, Ref, useEffect, useState } from 'react';

import { useAuthContext } from '@/hooks/useAuthContext';

import { CloseOutlined } from '@mui/icons-material';

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import FormForgot from '../FormForgot';
import FormLogin from '../FormLogin';
import FormRegister from '../FormRegister';
import TabsMenu from './TabMenu';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type ButtonDialogDataAccessProps = {
  openDialog: boolean;
  statusDialog: () => void;
};

const ButtonDialogDataAccess: FC<ButtonDialogDataAccessProps> = ({
  openDialog,
  statusDialog,
}) => {
  const [value, setValue] = useState(0);
  const [enabledRegister, setEnabledRegister] = useState(false);

  const { user } = useAuthContext();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleEnabledRegister = (enabled: boolean) => {
    setEnabledRegister(enabled);
  };

  useEffect(() => {
    if (user) {
      !user?.active && setValue(0);
    }
  }, [user]);

  return (
    <Box>
      <Button onClick={statusDialog} color="inherit">
        {!user ? 'Login' : !user?.active ? 'Aguardando ativação...' : 'LOGIN'}
      </Button>
      {openDialog && (
        <Dialog
          open={openDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={statusDialog}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <TabsMenu
              enabledRegister={enabledRegister}
              value={value}
              handleChange={handleChange}
            />
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {value === 0 ? (
                <FormLogin />
              ) : value === 1 ? (
                <FormRegister setValue={setValue} />
              ) : (
                <FormForgot
                  handleEnabledRegister={handleEnabledRegister}
                  value={value}
                />
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={statusDialog} endIcon={<CloseOutlined />}>
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ButtonDialogDataAccess;
