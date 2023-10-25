import { z } from 'zod';

export {
  TFiso,
  TFisoApprovedStakePool,
  TSpoSignups,
  TStakepool
};

const TFisoApprovedStakePool = z.object({
  startEpoch: z.number(),
  endEpoch: z.number(),
});

const TSpoSignups = z.object({
  poolId: z.string(),
  operatorName: z.string().optional(),
  operatorEmail: z.string().optional(),
  operatorTwitter: z.string().optional(),
  operatorDiscord: z.string().optional(),
  operatorTelegram: z.string().optional(),
});

const TFiso = z.object({
  tokenAmount: z.number(),
  tokenName: z.string(),
  tokenTicker: z.string(),
  startEpoch: z.number(),
  endEpoch: z.number(),
  approvedStakepools: z.array(TFisoApprovedStakePool),
  totalStakeEpoch: z.any().optional(),
  spoSignups: z.array(TSpoSignups),
});

const TStakepool = z.object({
  pool_id: z.string(),
  hex: z.string().optional(),
  url: z.string().optional(),
  hash: z.string().optional(),
  ticker: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  homepage: z.string().optional(),
});