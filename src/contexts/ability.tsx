import { createContextualCan } from '@casl/react';
import React, { FC, createContext } from 'react';

import { useAbilities } from '@/hooks/useAbilities';

import { AnyAbility } from '@casl/ability';

const AbilityContext = createContext<AnyAbility>({} as AnyAbility);
const Can = createContextualCan(AbilityContext.Consumer);

type AbilityProps = {
  children: React.ReactNode;
};

const AbilityProvider: FC<AbilityProps> = ({ children }) => {
  const { abilities } = useAbilities();

  return (
    <AbilityContext.Provider value={abilities}>
      {children}
    </AbilityContext.Provider>
  );
};

export { AbilityContext, Can, AbilityProvider };
