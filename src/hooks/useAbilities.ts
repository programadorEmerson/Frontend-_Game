import { useContext, useCallback, useEffect, useState } from 'react';

import _ from 'lodash';

import { FeatureCodeEnum } from '@/enums/feature';

import { createFullRule } from '@/utils/manageRules';

import { AbilityContext } from '@/contexts/ability';
import {
  AnyAbility,
  PureAbility,
  Subject,
  MongoQuery,
  SubjectRawRule,
  ExtractSubjectType,
} from '@casl/ability';

import { useAuthContext } from './useAuthContext';

export type AbilitiesProps =
  | Array<
      SubjectRawRule<
        string,
        ExtractSubjectType<Subject>,
        MongoQuery<{ [x: string]: any }>
      >
    >
  | undefined;

export type CaslAbilitiesProps = {
  abilities: PureAbility;
  featuresArray: string[];
  updateAbilities(rules: AbilitiesProps): void;
};

export const useAbilitiesContext = (): AnyAbility => useContext(AbilityContext);

export const useAbilities = (): CaslAbilitiesProps => {
  const [abilities, setAbilities] = useState(new PureAbility());
  const [featuresArray, setFeaturesArray] = useState<string[]>([]);

  const { user } = useAuthContext();

  const updateAbilities = useCallback((rules: AbilitiesProps) => {
    const abilitie = new PureAbility(rules);
    setFeaturesArray(
      _.chain(rules)
        .groupBy('subject')
        .map((_, value) => value as FeatureCodeEnum)
        .value(),
    );
    setAbilities(abilitie);
  }, []);

  useEffect(() => {
    const refreshAbilitiesState = () => {
      user && user.rules.length > 0
        ? updateAbilities(user.rules)
        : updateAbilities(createFullRule(FeatureCodeEnum.SHARED));
    };
    refreshAbilitiesState();
  }, [updateAbilities, user]);

  return { abilities, updateAbilities, featuresArray };
};
