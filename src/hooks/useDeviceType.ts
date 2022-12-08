import { ConstantsEnum } from '@/enums/constants';

import { useMediaQuery, useTheme } from '@mui/material';

const useDeviceType = (): { type: string; isMobile: boolean } => {
  const isMobile = !useMediaQuery(useTheme().breakpoints.up('sm'));
  return {
    type: isMobile ? ConstantsEnum.MOBILE : ConstantsEnum.OTHERS,
    isMobile,
  };
};

export default useDeviceType;
