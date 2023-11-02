import { useEffect, useState, useMemo, SetStateAction } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Typography,
  Divider,
  Box,
  Avatar,
  useTheme,
  Grid,
  useMediaQuery,
  Tabs,
  Tab,
  Collapse,
  Alert,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@components/Link";
import DiscordIcon from "@components/svgs/DiscordIcon";
import TwitterIcon from "@components/svgs/TwitterIcon";
import TelegramIcon from "@components/svgs/TelegramIcon";
import WebIcon from "@components/svgs/WebIcon";
import GithubIcon from "@components/svgs/GithubIcon";
import TokenomicsTab from "@components/projects/tokenomics/TokenomicsTab";
import WhitelistTab from "@components/projects/whitelist/WhitelistTab";
import ContributeTab from "@components/projects/contribute/ContributeTab";
import ProjectInfoTab from "@components/projects/info/ProjectInfoTab";
import { trpc } from '@lib/utils/trpc';
import FisoTab from "@components/projects/fiso/FisoTab";
import { mapFisoObject } from "@server/utils/mapProjectObject";

type TTabs = 'summary' | 'tokenomics' | 'whitelist' | 'contribute' | 'fiso'

const Project = () => {
  const theme = useTheme()
  const upMd = useMediaQuery(theme.breakpoints.up('md'))
  const router = useRouter();
  const { project_slug, tab } = router.query;
  const [projectData, setProjectData] = useState<TProject | undefined>(undefined)
  const [isLoading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState<TTabs>('summary');
  const [fisoData, setFisoData] = useState<TFiso[]>([])

  const project = trpc.project.getProject.useQuery(
    { slug: project_slug?.toString() },
    { enabled: project_slug !== undefined, retry: 0 }
  )
  const fisos = trpc.project.getProjectFisos.useQuery(
    { slug: project_slug?.toString() },
    { enabled: project_slug !== undefined }
  )

  useEffect(() => {
    if (fisos.isError) {
      console.log('error getting project fisos')
    }

    if (fisos.status === 'success' && fisos.data) {
      const fisoObject = mapFisoObject(fisos.data)
      setFisoData(fisoObject)
    }
  }, [fisos.status])

  useEffect(() => {
    // Check if tab is one of the TTabs values and not an array
    if (tab && typeof tab === 'string' && isTTabs(tab)) {
      setTabValue(tab);
    }
  }, [tab]);

  const isTTabs = (value: string): value is TTabs => {
    return ['summary', 'tokenomics', 'whitelist', 'contribute', 'fiso'].includes(value);
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: TTabs) => {
    event.preventDefault()
    setTabValue(newValue);
    router.push({
      pathname: router.pathname, // keeps you on the current page
      query: {
        ...router.query, // preserves existing query parameters
        tab: newValue // adds the new tab value as a query parameter
      },
    },
      undefined, // asPath
      { scroll: false });
  };

  const socialButtonSx = {
    mr: 1,
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.primary.main
    }
  }

  useEffect(() => {
    if (project.status === 'success') {
      setProjectData(project.data)
    }
  }, [project.status])

  return (
    <>
      {project.status === 'loading' || !projectData && project.status !== 'error'
        ? <Box sx={{ mb: 3, position: 'relative', height: '100vh', width: '100vw' }}>
          <Box sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>Loading project...</Box>
        </Box>
        : projectData ?
          <Container maxWidth="lg" sx={{ pt: 6 }}>
            <Grid container spacing={2} direction={upMd ? 'row' : 'column'} alignItems="center" sx={{ mb: 2 }}>
              <Grid item md='auto' sx={{ textAlign: 'center' }}>
                <Avatar
                  src={projectData.avatarImgUrl}
                  alt={projectData.name.replace(/cardano-(x-)?/, "")}
                  sx={{ width: 200, height: 200, display: "flex" }}
                />
              </Grid>
              <Grid item md>
                <Typography variant="h2" fontWeight={600}>{projectData.name.replace(/cardano-(x-)?/, "")}</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>{projectData.shortDescription}</Typography>
                <Box sx={{ display: "flex", justifyContent: "left", mb: 2 }}>
                  {projectData.socials?.website &&
                    <Link
                      sx={socialButtonSx}
                      href={projectData.socials.website}
                      aria-label={`${projectData.name.replace(/cardano-(x-)?/, "")} website`}
                    >
                      <WebIcon />
                    </Link>
                  }
                  {projectData.socials?.discord &&
                    <Link
                      sx={socialButtonSx}
                      href={projectData.socials.discord}
                      aria-label="discord"
                    >
                      <DiscordIcon />
                    </Link>
                  }
                  {projectData.socials?.github &&
                    <Link
                      sx={socialButtonSx}
                      href={projectData.socials.github}
                      aria-label="github"
                    >
                      <GithubIcon />
                    </Link>
                  }
                  {projectData.socials?.telegram &&
                    <Link
                      sx={socialButtonSx}
                      href={projectData.socials.telegram}
                      aria-label="Telegram"
                    >
                      <TelegramIcon />
                    </Link>
                  }
                  {projectData.socials?.twitter &&
                    <Link
                      sx={socialButtonSx}
                      href={projectData.socials.twitter}
                      aria-label="twitter"
                    >
                      <TwitterIcon />
                    </Link>
                  }
                </Box>
              </Grid>
            </Grid>

            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              scrollButtons="auto"
              allowScrollButtonsMobile
              variant="scrollable"
              sx={{
                '& .MuiTabs-flexContainer': {
                  justifyContent: upMd ? 'center' : null
                },
              }}
            >
              <Tab label="Summary" value={'summary'} />
              <Tab label="Tokenomics" value={'tokenomics'} />
              <Tab label="Whitelist" value={'whitelist'} />
              <Tab label="Contribute" value={'contribute'} />
              {fisoData.length > 0 && <Tab label="FISO" value={'fiso'} />}
            </Tabs>
            <Box sx={{ mb: 12, mt: 2 }}>
              {tabValue === 'summary' && <ProjectInfoTab project={projectData} />}
              {tabValue === 'tokenomics' && <TokenomicsTab tokenomics={projectData.tokenomics} />}
              {tabValue === 'whitelist' && <WhitelistTab whitelists={projectData.whitelists} projectSlug={projectData.slug} />}
              {tabValue === 'contribute' && <ContributeTab />}
              {tabValue === 'fiso' && <FisoTab projectSlug={projectData.slug} fisos={fisoData} />}
            </Box>
          </Container >
          : project.status === 'error' && <Container sx={{ textAlign: 'center', py: '20vh' }}>
            <Typography variant="h1">
              404
            </Typography>
            <Typography variant="body1" sx={{ mb: '24px' }}>
              This Project Could Not Be Found
            </Typography>
            <Typography variant="body1">
              The project you are looking for does not exist, has been removed, name changed, or is temporarily unavailable.
            </Typography>
            <Link href="/projects">
              Back to projects page
            </Link>
          </Container>}
    </>
  );
};

export default Project;