import {
  TFiso as ZodFiso,
  TFisoApprovedStakePool as ZodFisoApprovedStakePool,
  TSpoSignups as ZodSpoSignups,
  TStakepool as ZodStakepool,
} from '@lib/types/zod-schemas/fisoSchema';
import { z } from 'zod';

declare global {
  type TFiso = z.infer<typeof ZodFiso>;
  type TFisoApprovedStakePool = z.infer<typeof ZodFisoApprovedStakePool>;
  type TSpoSignups = z.infer<typeof ZodSpoSignups>;
  type TStakepool = z.infer<typeof ZodStakepool>;

  type TStakepoolStats = {
    id: number;
    hex: string;
    owners: string[];
    pool_id: string;
    vrf_key: string;
    live_size: number;
    created_at: string;
    fixed_cost: string;
    live_stake: string;
    retirement: any[];
    updated_at: string;
    active_size: number;
    live_pledge: string;
    margin_cost: number;
    active_stake: string;
    blocks_epoch: number;
    registration: string[];
    blocks_minted: number;
    reward_account: string;
    declared_pledge: string;
    live_delegators: number;
    live_saturation: number;
  };

  type TFullStakePool = {
    id: number;
    pool_id: string;
    hex: string;
    url: string;
    hash: string;
    ticker: string;
    name: string;
    description: string;
    homepage: string;
    stats: TStakepoolStats;
    history: TStakepoolHistory[];
    fisoPools: TFisoApprovedStakePool[];
    SpoSignups: TSpoSignups[];
  }

  type TUserStakeHistory = {
    active_epoch: number;
    amount: string;
    pool_id: string;
  }

  type TStakepoolHistory = {
    epoch: number;
    blocks: number;
    active_stake: string;
    active_size: number;
    delegators_count: number;
    rewards: string;
    fees: string;
  }
}