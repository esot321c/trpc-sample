import React, { FC, useContext } from "react";
import { Grid, Link, useTheme } from "@mui/material";
import TelegramIcon from "@components/svgs/TelegramIcon";
import YoutubeIcon from "@components/svgs/YoutubeIcon";
import MediumIcon from "@components/svgs/MediumIcon";
import TwitterIcon from "@components/svgs/TwitterIcon";
import DiscordIcon from "@components/svgs/DiscordIcon";
import RedditIcon from "@components/svgs/RedditIcon";
import LinkedinIcon from "@components/svgs/LinkedinIcon";
import GithubIcon from "@components/svgs/GithubIcon";

interface Props {
  hoverColor?: string;
  iconColor?: string;
  reddit?: string;
  discord?: string;
  linkedin?: string;
  medium?: string;
  telegram?: string;
  twitter?: string;
  youtube?: string;
  github?: string;
}

const SocialGrid: FC<Props> = (props) => {
  const {
    hoverColor,
    iconColor,
    reddit,
    discord,
    linkedin,
    medium,
    telegram,
    twitter,
    youtube,
    github
  } = props;
  const theme = useTheme();
  const iconLinkStyles = {
    color: iconColor ? iconColor : theme.palette.text.primary,
    fontSize: "inherit",
    "&:hover": {
      color: hoverColor ? hoverColor : theme.palette.primary.main,
    },
  };

  return (
    <>
      {telegram && <Grid item>
        <Link
          href={telegram}
          target="_blank"
          sx={iconLinkStyles}
          rel="noreferrer"
        >
          <TelegramIcon sx={{ fontSize: "inherit" }} />
        </Link>
      </Grid>}
      {discord && <Grid item>
        <Link
          href={discord}
          target="_blank"
          sx={iconLinkStyles}
          rel="noreferrer"
        >
          <DiscordIcon sx={{ fontSize: "inherit" }} />
        </Link>
      </Grid>}
      {twitter && <Grid item>
        <Link
          href={twitter}
          target="_blank"
          sx={iconLinkStyles}
          rel="noreferrer"
        >
          <TwitterIcon sx={{ fontSize: "inherit" }} />
        </Link>
      </Grid>}
      {youtube && <Grid item>
        <Link
          href={youtube}
          target="_blank"
          sx={iconLinkStyles}
          rel="noreferrer"
        >
          <YoutubeIcon sx={{ fontSize: "inherit" }} />
        </Link>
      </Grid>}
      {github && <Grid item>
        <Link
          href={github}
          target="_blank"
          sx={iconLinkStyles}
          rel="noreferrer"
        >
          <GithubIcon sx={{ fontSize: "inherit" }} />
        </Link>
      </Grid>}
      {medium && <Grid item>
        <Link
          href={medium}
          target="_blank"
          sx={iconLinkStyles}
          rel="noreferrer"
        >
          <MediumIcon sx={{ fontSize: "inherit" }} />
        </Link>
      </Grid>}
      {linkedin && <Grid item>
        <Link
          href={linkedin}
          target="_blank"
          sx={iconLinkStyles}
          rel="noreferrer"
        >
          <LinkedinIcon sx={{ fontSize: "inherit" }} />
        </Link>
      </Grid>}
      {reddit && <Grid item>
        <Link
          href={reddit}
          target="_blank"
          sx={iconLinkStyles}
          rel="noreferrer"
        >
          <RedditIcon sx={{ fontSize: "inherit" }} />
        </Link>
      </Grid>}
    </>
  );
};

export default SocialGrid;
