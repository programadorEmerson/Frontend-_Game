/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';

import { useFormik } from 'formik';

import { MessagesEnum } from '@/enums/messages';

import { useAuthContext } from '@/hooks/useAuthContext';

import { GroupAdd, Visibility, VisibilityOff } from '@mui/icons-material';

import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';

import AuthService from '@/services/auth';

import {
  initialValuesRegister as initialValues,
  schemaRegister as validationSchema,
} from 'src/schemas/register.user';

import { AlertNotification } from '../AlertNotification';
import CheckListPassword from '../CheckListPassword';
import { Loading } from '../Loading';
import { FormDataAccess } from './styles';

type FormRegisterProps = {
  setValue: (value: number) => void;
};

const FormRegister: FC<FormRegisterProps> = ({ setValue }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [anchorChecklist, setAnchorChecklist] = useState<HTMLElement | null>(
    null,
  );

  const authService = new AuthService();

  const handleOpenChecklistPass = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorChecklist(event.currentTarget);
  };

  const handleCloseChecklistPass = () => {
    setAnchorChecklist(null);
  };

  const openedChecklist = Boolean(anchorChecklist);

  const { updateUser } = useAuthContext();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (dataRegister) => {
      setIsFetching(true);
      const response = await authService.handleRegister(dataRegister);
      let message: MessagesEnum | string = MessagesEnum.CODE_SEND;
      let type: 'success' | 'error' = 'success';
      if (typeof response === 'string') {
        message = response;
        type = 'error';
      } else {
        updateUser(response);
      }
      AlertNotification({ type, message });
      setIsFetching(false);
      setValue(0);
    },
  });

  useEffect(() => {
    return () => {
      formik.resetForm();
    };
  }, []);

  return (
    <FormDataAccess onSubmit={formik.handleSubmit}>
      <Loading trigger={isFetching} message={MessagesEnum.REGISTERING} />
      <Stack mt={1} width="88%" direction="column" spacing={2}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="E-mail"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          label="Senha"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          helperText={
            formik.touched.password &&
            Boolean(formik.errors.password) && (
              <CheckListPassword
                handleCloseChecklistPass={handleCloseChecklistPass}
                handleOpenChecklistPass={handleOpenChecklistPass}
                openedChecklist={openedChecklist}
                anchorChecklist={anchorChecklist}
                formik={formik}
              />
            )
          }
        />
        <TextField
          fullWidth
          type={showPasswordConfirm ? 'text' : 'password'}
          id="passwordConfirm"
          name="passwordConfirm"
          label="Confirme a senha"
          value={formik.values.passwordConfirm}
          onChange={formik.handleChange}
          error={
            formik.touched.passwordConfirm &&
            Boolean(formik.errors.passwordConfirm)
          }
          helperText={
            formik.touched.passwordConfirm && formik.errors.passwordConfirm
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          startIcon={<GroupAdd />}
          type="submit"
          size="large"
          variant="outlined"
        >
          Realizar cadastro
        </Button>
      </Stack>
    </FormDataAccess>
  );
};

export default FormRegister;
