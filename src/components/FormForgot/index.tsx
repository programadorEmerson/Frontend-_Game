/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';

import { useFormik } from 'formik';

import { MessagesEnum } from '@/enums/messages';

import { useAuthContext } from '@/hooks/useAuthContext';

import {
  DoneOutline,
  Key,
  Sync,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { ApiService } from '@/services/api';
import AuthService from '@/services/auth';

import {
  initialValuesForgot as initialValues,
  schemaForgot as validationSchema,
} from 'src/schemas/forgot.password';

import { AlertNotification } from '../AlertNotification';
import CheckListPassword from '../CheckListPassword';
import DigitsInput from '../DigitsInput';
import { Loading } from '../Loading';
import { FormDataAccess } from './styles';

type FormForgotProps = {
  value: number;
  handleEnabledRegister: (enabled: boolean) => void;
};

const FormForgot: FC<FormForgotProps> = ({ value, handleEnabledRegister }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [requestedReset, setRequestedReset] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [userId, setUserId] = useState('');
  const [digitsValue, setDigitsValue] = useState<
    Record<string, string> | undefined
  >();
  const [anchorChecklist, setAnchorChecklist] = useState<HTMLElement | null>(
    null,
  );

  const { updateUser } = useAuthContext();

  const authService = new AuthService();

  const handleOpenChecklistPass = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorChecklist(event.currentTarget);
  };

  const handleCloseChecklistPass = () => {
    setAnchorChecklist(null);
  };

  const openedChecklist = Boolean(anchorChecklist);

  const getDataUser = async (apiService: ApiService) => {
    const { email, redefinePassword } = await apiService.decodeToken();
    formik.setFieldValue('email', email);
    setRequestedReset(redefinePassword);
  };

  const verifyTab = async () => {
    if (value === 2) {
      const apiService = new ApiService();
      const token = apiService.getApiToken();
      if (token) {
        getDataUser(apiService);
        const { _id } = await apiService.decodeToken();
        setUserId(_id);
      }
    }
  };

  const initializeFormNewPassword = async () => {
    formik.setFieldValue('password', '');
    formik.setFieldValue('passwordConfirm', '');
    formik.setErrors({
      password: '',
      passwordConfirm: '',
    });
    formik.setTouched({
      password: false,
      passwordConfirm: false,
    });
    setShowNewPassword(true);
    await verifyTab();
    handleEnabledRegister(true);
  };

  const handleUpdatePass = async (password: string) => {
    setIsFetching(true);
    const response = await authService.handleUpdatePass(password, userId);
    let message: MessagesEnum | string = MessagesEnum.INSERT_NEW_PASSWORD;
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

  const handleResetPassword = async (email: string) => {
    setIsFetching(true);
    const response = await authService.handleResetPassword(email);
    let message: MessagesEnum | string = MessagesEnum.CODE_SEND;
    let type: 'success' | 'error' = 'success';
    if (typeof response === 'string') {
      message = response;
      type = 'error';
    } else {
      updateUser(response);
    }
    await verifyTab();
    AlertNotification({ type, message });
    setIsFetching(false);
  };

  const handleConfirmCode = async () => {
    const { email } = formik.values;
    if (digitsValue) {
      const code = Object.values(digitsValue).join('');
      setIsFetching(true);
      const { type, message } = await authService.handleVerifyCode(code, email);

      if (type === 'success') {
        await initializeFormNewPassword();
        setShowNewPassword(true);
      }
      AlertNotification({ type, message });
      setIsFetching(false);
    }
  };

  useEffect(() => {
    verifyTab();
  }, [value]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async ({ email, password }) => {
      if (showNewPassword) {
        await handleUpdatePass(password);
      } else {
        await handleResetPassword(email);
      }
    },
  });

  useEffect(() => {
    return () => {
      formik.resetForm();
    };
  }, []);

  return (
    <FormDataAccess onSubmit={formik.handleSubmit}>
      <Loading trigger={isFetching} message={MessagesEnum.VALIDATING_DATA} />
      <Stack mt={1} width="88%" direction="column" spacing={2}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="E-mail"
          disabled={requestedReset}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        {requestedReset && (
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Typography pb={1} variant="subtitle1" gutterBottom>
              {!showNewPassword
                ? 'Informe o código enviado para o seu e-mail'
                : 'Insira a nova senha'}
            </Typography>
            <Stack
              direction={showNewPassword ? 'column' : 'row'}
              spacing={showNewPassword ? 2 : 1}
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              {showNewPassword ? (
                <>
                  <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    label="Senha"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            //   disabled={Boolean(recoveredCode)}
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
                      formik.touched.passwordConfirm &&
                      formik.errors.passwordConfirm
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            //   disabled={Boolean(recoveredCode)}
                            onClick={() =>
                              setShowPasswordConfirm(!showPasswordConfirm)
                            }
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              ) : (
                <Box
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
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
            </Stack>
          </Box>
        )}
        <Stack direction="row" spacing={2} width="100%">
          {requestedReset && !showNewPassword ? (
            <Stack direction="row" spacing={2} width="100%">
              <Button
                startIcon={<Sync />}
                type="submit"
                size="large"
                variant="outlined"
                fullWidth
              >
                Reenviar código
              </Button>
              <Button
                startIcon={<DoneOutline />}
                type="button"
                size="large"
                variant="outlined"
                onClick={handleConfirmCode}
                fullWidth
              >
                Confirmar código
              </Button>
            </Stack>
          ) : (
            <Button
              startIcon={showNewPassword ? <DoneOutline /> : <Key />}
              type="submit"
              size="large"
              variant="outlined"
              fullWidth
            >
              {showNewPassword ? 'Confirmar nova senha' : 'Recuperar senha'}
            </Button>
          )}
        </Stack>
      </Stack>
    </FormDataAccess>
  );
};

export default FormForgot;
