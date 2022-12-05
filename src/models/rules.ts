import { FeatureCodeEnum, FeatureCodeAction } from '@/enums/feature';

export class Rule {
  constructor(
    public action: FeatureCodeAction,
    public subject: FeatureCodeEnum,
  ) {}
}
