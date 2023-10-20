-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "walletType" TEXT,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "status" TEXT,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "default_address" TEXT,
    "reward_address" TEXT,
    "walletType" TEXT,
    "nonce" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "sumsub_id" TEXT,
    "sumsub_type" TEXT,
    "sumsub_result" JSONB,
    "sumsub_status" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "wallets" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "reward_address" TEXT NOT NULL,
    "change_address" TEXT NOT NULL,
    "unused_addresses" TEXT[],
    "used_addresses" TEXT[],
    "user_id" TEXT NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spo_signups" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "signups" TEXT[],

    CONSTRAINT "spo_signups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stakepools" (
    "id" SERIAL NOT NULL,
    "pool_id" TEXT NOT NULL,
    "hex" TEXT,
    "url" TEXT,
    "hash" TEXT,
    "ticker" TEXT,
    "name" TEXT,
    "description" TEXT,
    "homepage" TEXT,

    CONSTRAINT "stakepools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stakepool_stats" (
    "id" SERIAL NOT NULL,
    "pool_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "hex" TEXT NOT NULL,
    "vrf_key" TEXT NOT NULL,
    "blocks_minted" INTEGER NOT NULL,
    "blocks_epoch" INTEGER NOT NULL,
    "live_stake" TEXT NOT NULL,
    "live_size" DOUBLE PRECISION NOT NULL,
    "live_saturation" DOUBLE PRECISION NOT NULL,
    "live_delegators" INTEGER NOT NULL,
    "active_stake" TEXT NOT NULL,
    "active_size" DOUBLE PRECISION NOT NULL,
    "declared_pledge" TEXT NOT NULL,
    "live_pledge" TEXT NOT NULL,
    "margin_cost" DOUBLE PRECISION NOT NULL,
    "fixed_cost" TEXT NOT NULL,
    "reward_account" TEXT NOT NULL,
    "owners" TEXT[],
    "registration" TEXT[],
    "retirement" TEXT[],

    CONSTRAINT "stakepool_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stakepool_cache" (
    "id" SERIAL NOT NULL,
    "spoListKey" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stakepool_cache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "whitepaper_link" TEXT,
    "description" TEXT NOT NULL,
    "blockchains" TEXT[],
    "funds_raised" INTEGER,
    "banner_img_url" TEXT NOT NULL,
    "avatar_img_url" TEXT NOT NULL,
    "is_launched" BOOLEAN NOT NULL,
    "is_draft" BOOLEAN NOT NULL,
    "fiso_pool_ids" TEXT[],

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_socials" (
    "id" SERIAL NOT NULL,
    "telegram" TEXT,
    "twitter" TEXT,
    "discord" TEXT,
    "github" TEXT,
    "website" TEXT,
    "project_slug" TEXT NOT NULL,

    CONSTRAINT "project_socials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_roadmaps" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "project_slug" TEXT NOT NULL,

    CONSTRAINT "project_roadmaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "profile_img_url" TEXT,
    "twitter" TEXT,
    "linkedin" TEXT,
    "project_slug" TEXT NOT NULL,

    CONSTRAINT "project_team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_tokenomics" (
    "id" SERIAL NOT NULL,
    "token_name" TEXT NOT NULL,
    "total_tokens" INTEGER NOT NULL,
    "token_ticker" TEXT NOT NULL,
    "project_slug" TEXT NOT NULL,

    CONSTRAINT "project_tokenomics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_tokenomics_items" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "value" TEXT,
    "tge" TEXT,
    "freq" TEXT,
    "length" TEXT,
    "lockup" TEXT,
    "tokenomicsId" INTEGER NOT NULL,

    CONSTRAINT "project_tokenomics_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "whitelists" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "start_date_time" TIMESTAMP(3) NOT NULL,
    "end_date_time" TIMESTAMP(3) NOT NULL,
    "max_per_signup" INTEGER,
    "hard_cap" INTEGER,
    "external_link" TEXT,
    "project_slug" TEXT NOT NULL,

    CONSTRAINT "whitelists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "whitelist_signups" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "amount_requested" TEXT NOT NULL,
    "amount_approved" TEXT,
    "status" TEXT,
    "notes" TEXT,
    "whitelist_slug" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "whitelist_signups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_default_address_key" ON "users"("default_address");

-- CreateIndex
CREATE UNIQUE INDEX "users_reward_address_key" ON "users"("reward_address");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_token_key" ON "verificationtokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "verificationtokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_reward_address_key" ON "wallets"("reward_address");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_change_address_key" ON "wallets"("change_address");

-- CreateIndex
CREATE UNIQUE INDEX "spo_signups_email_key" ON "spo_signups"("email");

-- CreateIndex
CREATE UNIQUE INDEX "stakepools_pool_id_key" ON "stakepools"("pool_id");

-- CreateIndex
CREATE UNIQUE INDEX "stakepool_stats_pool_id_key" ON "stakepool_stats"("pool_id");

-- CreateIndex
CREATE UNIQUE INDEX "stakepool_cache_spoListKey_key" ON "stakepool_cache"("spoListKey");

-- CreateIndex
CREATE UNIQUE INDEX "projects_name_key" ON "projects"("name");

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "project_socials_project_slug_key" ON "project_socials"("project_slug");

-- CreateIndex
CREATE UNIQUE INDEX "project_tokenomics_project_slug_key" ON "project_tokenomics"("project_slug");

-- CreateIndex
CREATE UNIQUE INDEX "whitelists_name_key" ON "whitelists"("name");

-- CreateIndex
CREATE UNIQUE INDEX "whitelists_slug_key" ON "whitelists"("slug");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stakepool_stats" ADD CONSTRAINT "stakepool_stats_pool_id_fkey" FOREIGN KEY ("pool_id") REFERENCES "stakepools"("pool_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_socials" ADD CONSTRAINT "project_socials_project_slug_fkey" FOREIGN KEY ("project_slug") REFERENCES "projects"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_roadmaps" ADD CONSTRAINT "project_roadmaps_project_slug_fkey" FOREIGN KEY ("project_slug") REFERENCES "projects"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_team" ADD CONSTRAINT "project_team_project_slug_fkey" FOREIGN KEY ("project_slug") REFERENCES "projects"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_tokenomics" ADD CONSTRAINT "project_tokenomics_project_slug_fkey" FOREIGN KEY ("project_slug") REFERENCES "projects"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_tokenomics_items" ADD CONSTRAINT "project_tokenomics_items_tokenomicsId_fkey" FOREIGN KEY ("tokenomicsId") REFERENCES "project_tokenomics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whitelists" ADD CONSTRAINT "whitelists_project_slug_fkey" FOREIGN KEY ("project_slug") REFERENCES "projects"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whitelist_signups" ADD CONSTRAINT "whitelist_signups_whitelist_slug_fkey" FOREIGN KEY ("whitelist_slug") REFERENCES "whitelists"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whitelist_signups" ADD CONSTRAINT "whitelist_signups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
