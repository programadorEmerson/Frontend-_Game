import { ErrorEnum } from '@/enums/erros';
import { FeatureCodeAction, FeatureCodeEnum } from '@/enums/feature';

import { Rule } from '@/models/rules';

export const returnCodeEnum = (feature: string) => {
  switch (feature) {
    case 'FC_ALL':
      return FeatureCodeEnum.SHARED;
    default:
      return ErrorEnum.ROLE_NOT_FOUND;
  }
};

export const createFullRule = (subject: FeatureCodeEnum): Rule[] => {
  return Object.values(FeatureCodeAction).map((action) => {
    return new Rule(action, subject);
  });
};

export const updateRule = (rule: Rule, rules: Rule[]): Rule[] => {
  const ruleExists = rules.some(
    (crrRule) =>
      crrRule.action === rule.action && crrRule.subject === rule.subject,
  )
    ? rules.filter(
        (crrRule) =>
          crrRule.action !== rule.action || crrRule.subject !== rule.subject,
      )
    : [...rules, rule];
  return ruleExists;
};
