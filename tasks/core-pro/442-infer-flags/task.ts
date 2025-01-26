import { type FeatureFlags } from './legacy-flags.ts';

type FlagsV2<T> = {
  [Key in keyof T as Key extends `is${infer Feature}V2Enabled` ? Feature : never]: T[Key];
};

export type ModernFeatureFlags = FlagsV2<FeatureFlags>;

export function getFeatureFlagsV2(flags: FeatureFlags): ModernFeatureFlags {
  const flagsV2: ModernFeatureFlags = Object.fromEntries(
    Object.entries(flags)
      .filter(([key]) => key.includes('V2'))
      .map(([key, value]) => [key.replace('V2', ''), value]),
  ) as ModernFeatureFlags;

  return flagsV2;
}
