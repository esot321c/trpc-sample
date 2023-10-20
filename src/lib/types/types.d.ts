type TNonceResponse = {
  nonce: string;
  userId: string;
}

interface IProjectDetails {
  title: string;
  tagline: string;
  imageUrl: string;
  category: string;
  status: "Complete" | "Upcoming";
  blockchains: string[];
}

type TFullStakePool = {
  id: number;
  hex: string;
  url: string;
  hash: string;
  name: string;
  ticker: string;
  pool_id: string;
  homepage: string;
  description: string;
  stats: {
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
}