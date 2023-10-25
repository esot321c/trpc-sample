import { TProject } from "@lib/types/zod-schemas/projectSchema";
import {
  Project,
  Roadmap,
  Socials,
  Team,
  Tokenomic,
  Tokenomics,
  Whitelist
} from "@prisma/client";
import { z } from "zod";

interface TokenomicsWithRelations extends Tokenomics {
  tokenomic: Tokenomic[]
}

// interface FisoWithRelations extends Fiso {
//   approvedStakepools: FisoApprovedStakePool[];
//   spoSignups: SpoSignups[];
// }

interface ProjectWithRelations extends Project {
  socials: Socials | null;
  roadmap: Roadmap[];
  team: Team[];
  tokenomics: TokenomicsWithRelations | null;
  whitelists: Whitelist[];
  // fisos: FisoWithRelations[];
}

export const mapFullProjectFromDb = (projectDb: ProjectWithRelations | null): z.infer<typeof TProject> | undefined => {
  if (!projectDb) {
    return undefined;
  }

  // Map Socials
  const socials = projectDb.socials
    ? projectDb.socials
    : {};

  // Map Roadmaps
  const roadmaps = projectDb.roadmap.map(roadmap => ({
    name: roadmap.name,
    description: roadmap.description,
    date: roadmap.date, // Assuming date is directly compatible, or you may need to convert
  }));

  // Map Teams
  const teams = projectDb.team.map(team => ({
    name: team.name,
    description: team.description,
    profileImgUrl: team.profileImgUrl || '',
    twitter: team.twitter || '',
    linkedin: team.linkedin || '',
  }));

  // Map Tokenomics and Tokenomic
  const tokenomics = projectDb.tokenomics ? {
    tokenName: projectDb.tokenomics.tokenName,
    totalTokens: projectDb.tokenomics.totalTokens,
    tokenTicker: projectDb.tokenomics.tokenTicker,
    tokenomics: projectDb.tokenomics.tokenomic.map(tokenomic => ({
      name: tokenomic.name,
      amount: tokenomic.amount,
      value: tokenomic.value || '',
      tge: tokenomic.tge || '',
      freq: tokenomic.freq || '',
      length: tokenomic.length || '',
      lockup: tokenomic.lockup || '',
    })),
  } : { // default empty object if tokenomics is null
    tokenName: '',
    totalTokens: 0,
    tokenTicker: '',
    tokenomics: [],
  };

  // Map Whitelists
  const whitelists = projectDb.whitelists.map(whitelist => ({
    name: whitelist.name,
    slug: whitelist.slug,
    startDateTime: whitelist.startDateTime,
    endDateTime: whitelist.endDateTime,
    maxPerSignup: whitelist.maxPerSignup || 0,
    hardCap: whitelist.hardCap || 0,
    externalLink: whitelist.externalLink || '',
  }));

  // // Map Fisos
  // const fisos = projectDb.fisos.map(fiso => ({
  //   tokenAmount: fiso.tokenAmount,
  //   tokenName: fiso.tokenName,
  //   tokenTicker: fiso.tokenTicker,
  //   startEpoch: fiso.startEpoch,
  //   endEpoch: fiso.endEpoch,
  //   projectSlug: fiso.projectSlug,
  //   approvedStakepools: fiso.approvedStakepools.map(pool => ({
  //     startEpoch: pool.startEpoch,
  //     endEpoch: pool.endEpoch,
  //     fisoId: pool.fisoId,
  //     poolId: pool.poolId,
  //   })),
  //   spoSignups: fiso.spoSignups.map(signup => ({
  //     poolId: signup.poolId,
  //     operatorName: signup.operatorName || '',
  //     operatorEmail: signup.operatorEmail || '',
  //     operatorTwitter: signup.operatorTwitter || '',
  //     operatorDiscord: signup.operatorDiscord || '',
  //     operatorTelegram: signup.operatorTelegram || '',
  //   })),
  //   totalStakeEpoch: fiso.totalStakeEpoch || {}, // Assuming it's an object, adjust if needed
  // }));

  // Combine everything into a project
  const project: z.infer<typeof TProject> = {
    name: projectDb.name,
    slug: projectDb.slug,
    shortDescription: projectDb.shortDescription,
    whitepaperLink: projectDb.whitepaperLink || '',
    description: projectDb.description,
    blockchains: projectDb.blockchains,
    fundsRaised: projectDb.fundsRaised || 0,
    bannerImgUrl: projectDb.bannerImgUrl,
    avatarImgUrl: projectDb.avatarImgUrl,
    isLaunched: projectDb.isLaunched,
    isDraft: projectDb.isDraft,
    socials: socials,
    roadmap: roadmaps,
    team: teams,
    tokenomics: tokenomics,
    whitelists: whitelists,
    fisos: []
  };

  return project;
}