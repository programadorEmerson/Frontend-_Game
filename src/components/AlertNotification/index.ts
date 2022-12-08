import { toast, ToastOptions } from 'react-toastify';

type AlertNotificationProps = {
  message: string;
} & ToastOptions;

export const AlertNotification = ({
  message,
  position = 'top-center',
  autoClose = 5000,
  hideProgressBar = false,
  closeOnClick = false,
  pauseOnHover = false,
  draggable = false,
  ...rest
}: AlertNotificationProps) =>
  toast(message, {
    ...rest,
    progress: undefined,
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
  });
