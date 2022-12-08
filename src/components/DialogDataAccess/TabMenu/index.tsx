import { FC, useEffect, useState } from 'react';

import { useAuthContext } from '@/hooks/useAuthContext';
import useDeviceType from '@/hooks/useDeviceType';

import { AccountCircle, GroupAdd, Key } from '@mui/icons-material';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { ApiService } from '@/services/api';

type TabsMenuProps = {
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  value: number;
  enabledRegister: boolean;
};

const TabsMenu: FC<TabsMenuProps> = ({
  handleChange,
  value,
  enabledRegister,
}) => {
  const [redefinePassword, setRedefinePassword] = useState(false);

  const { user } = useAuthContext();
  const { isMobile } = useDeviceType();

  const getDataUser = async (apiService: ApiService) => {
    const { redefinePassword } = await apiService.decodeToken();
    setRedefinePassword(redefinePassword);
  };

  useEffect(() => {
    if (value === 2) {
      const apiService = new ApiService();
      const token = apiService.getApiToken();
      if (token) {
        getDataUser(apiService);
      }
    }
  }, [value]);

  return (
    <Tabs
      variant="scrollable"
      scrollButtons="auto"
      value={value}
      onChange={handleChange}
      allowScrollButtonsMobile={isMobile}
      aria-label="icon position tabs"
    >
      <Tab
        icon={<AccountCircle />}
        iconPosition="start"
        label="Efetuar login"
      />
      <Tab
        disabled={
          (Boolean(user) && !user?.active) ||
          redefinePassword ||
          enabledRegister
        }
        icon={<GroupAdd />}
        iconPosition="start"
        label="Cadastre-se"
      />
      <Tab
        disabled={Boolean(user) && !user?.active}
        icon={<Key />}
        iconPosition="start"
        label="Recuperar senha"
      />
    </Tabs>
  );
};

export default TabsMenu;
