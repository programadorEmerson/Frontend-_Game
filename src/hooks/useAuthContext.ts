import { useContext } from 'react';

import { UserContext, UserProps } from '@/contexts/user';

export const useAuthContext = (): UserProps => useContext(UserContext);
