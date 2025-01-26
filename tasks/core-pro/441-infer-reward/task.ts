export type RewardRadar<Scan extends string> =
  Scan extends `${string}[${infer Reward}]${infer Rest}`
    ? Reward extends `${infer N extends number}$`
      ? N extends 0
        ? RewardRadar<Rest>
        : Reward
      : RewardRadar<Rest>
    : null;
