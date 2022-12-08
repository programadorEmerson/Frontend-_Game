/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';

import { useFormik } from 'formik';

import { MessagesEnum } from '@/enums/messages';

import { useAuthContext } from '@/hooks/useAuthContext';

import { Visibility, VisibilityOff } from '@mui/icons-material';

import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { ApiService } from '@/services/api';
import AuthService from '@/services/auth';

import {
  InitialValuesLogin,
  initialValuesLogin as initialValues,
  schemaLogin as validationSchema,
} from 'src/schemas/sigin.user';

import { AlertNotification } from '../AlertNotification';
import DigitsInput from '../DigitsInput';
import { Loading } from '../Loading';
import OptionsButtons from './OptionsButtons';
import { FormDataAccess } from './styles';

const FormLogin: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [digitsValue, setDigitsValue] = useState<
    Record<string, string> | undefined
  >();

  const { user, updateUser } = useAuthContext();

  const authService = new AuthService();

  const handleSignin = async (dataLogin: InitialValuesLogin) => {
    setIsFetching(true);
    const response = await authService.handleSignin(dataLogin);

    let message: MessagesEnum | string = MessagesEnum.LOGIN_SUCCESS;
    let type: 'success' | 'error' = 'success';

    if (typeof response === 'string') {
      message = response;
      type = 'error';
    } else {
      updateUser(response);
    }
    AlertNotification({ type, message });
    setIsFetching(false);
  };

  const handleConfirmCode = async () => {
    if (user && digitsValue) {
      setIsFetching(true);
      const { email } = formik.values;
      const code = Object.values(digitsValue).join('');
      const response = await authService.handleConfirmCode(code, email);
      let type: 'success' | 'error' = 'success';
      let message: MessagesEnum | string = MessagesEnum.USER_CONFIRMED;

      if (typeof response === 'string') {
        message = response;
        type = 'error';
      } else {
        const api = new ApiService();
        const token = api.getApiToken();
        updateUser({ token, userInfo: { ...user, active: true } });
      }
      AlertNotification({ type, message });
      setIsFetching(false);
    }
  };

  const handleResendCode = async () => {
    if (user) {
      const { email } = formik.values;
      const response = await authService.handleResendCode(email);

      let message: MessagesEnum | string = MessagesEnum.CODE_RESEND;
      let type: 'success' | 'error' = 'success';

      if (typeof response === 'string') {
        message = response;
        type = 'error';
      }
      AlertNotification({ type, message });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (dataLogin) => {
      if (user && !user?.active) {
        await handleConfirmCode();
      } else {
        await handleSignin(dataLogin);
      }
    },
  });

  useEffect(() => {
    if (user) {
      formik.setValues({
        email: user.email,
        password: user.email,
      });
    }
  }, [user]);

  useEffect(() => {
    return () => {
      formik.resetForm();
    };
  }, []);

  return (
    <FormDataAccess onSubmit={formik.handleSubmit}>
      <Loading trigger={isFetching} message={MessagesEnum.REQUEST_LOGIN} />
      <Stack
        width="88%"
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        mt={1}
      >
        <TextField
          fullWidth
          id="email"
          name="email"
          label="E-mail"
          disabled={isFetching || (Boolean(user) && !user?.active)}
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
          disabled={isFetching || (Boolean(user) && !user?.active)}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  disabled={isFetching || (Boolean(user) && !user?.active)}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {user && !user.active && (
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1" gutterBottom>
              Informe o código recebido por email
            </Typography>
            <Stack direction="row" spacing={2}>
              <DigitsInput
                digitsValue={digitsValue}
                setDigitsValue={setDigitsValue}
                numberDigits={6}
                isFetching={isFetching}
              />
            </Stack>
          </Box>
        )}
        <OptionsButtons
          handleResendCode={handleResendCode}
          isFetching={isFetching}
          user={user}
        />
      </Stack>
    </FormDataAccess>
  );
};

export default FormLogin;
