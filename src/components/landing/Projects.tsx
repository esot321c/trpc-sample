import React, { FC, useRef, useState, useEffect } from 'react';
import type { NextPage } from 'next'
import {
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  Grid as MuiGrid,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  CardMedia,
  Box,
  IconButton,
  Chip,
} from '@mui/material'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';
import { Autoplay, Navigation, Pagination, Grid } from 'swiper/modules'
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import ProjectCard from '@components/projects/ProjectCard';
import { trpc } from '@lib/utils/trpc';
import { slugify } from '@lib/utils/general';

SwiperCore.use([Navigation]);

type ExtendedSwiperRef = typeof Swiper & {
  swiper: SwiperCore;
};

interface IProjectsProps {

}

const Projects: FC<IProjectsProps> = ({ }) => {
  const theme = useTheme()
  const upMd = useMediaQuery(theme.breakpoints.up('md'))
  const swiperRef = useRef<ExtendedSwiperRef | null>(null);
  const [projects, setProjects] = useState<IProjectDetails[]>([]);
  const { data: projectList } = trpc.project.getProjectList.useQuery({});

  useEffect(() => {
    if (projectList) {
      setProjects(
        projectList.filter(project => project.frontPage).map((item) => {
          const details: IProjectDetails = {
            title: item.name,
            tagline: item.shortDescription,
            category: '',
            imageUrl: item.bannerImgUrl,
            status: item.isLaunched
              ? "Complete"
              : "Upcoming", // 'In Progress', 'Complete'
            blockchains: item.blockchains
          }
          return (details)
        }))
    }
  }, [projectList]);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };
  return (
    <>

      <Container sx={{ mb: 12, display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
        <Box sx={{ width: upMd ? '97%' : '100%' }}>
          <MuiGrid container spacing={3} sx={{ mb: 3 }}>
            <MuiGrid item md={3}>
              <Typography
                variant="h2"
                fontWeight={600}
              // align="center"
              // gutterBottom
              >
                Projects
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 3 }}>Check out the upcoming and past IDOs</Typography>
              <Button variant="contained" color="secondary" href="/projects">
                All Projects
              </Button>
            </MuiGrid>
            <MuiGrid item md={9} sx={{ maxWidth: '100%', }}>
              <Box
                sx={{
                  position: 'relative',
                  display: 'block',
                  '& .swiper-slide': {
                    pb: 6
                  },
                  '& .swiper-button-next, .swiper-button-prev': {
                    color: theme.palette.divider,
                    '&:hover': {
                      color: theme.palette.primary.main,
                    }
                  },
                  '& .swiper-pagination-bullet': {
                    background: theme.palette.text.secondary,
                  },
                  '& .swiper-pagination-bullet-active': {
                    background: theme.palette.primary.main,
                  }
                }}
              >
                <Swiper
                  ref={swiperRef}
                  pagination={{
                    clickable: true,
                  }}
                  slidesPerView={1}
                  spaceBetween={10}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      slidesPerGroup: 2,
                      spaceBetween: 20,
                    },
                  }}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: true,
                  }}
                  loop={true}
                  // navigation
                  modules={[Grid, Pagination, Navigation, Autoplay]}
                  className="mySwiper"
                >
                  {projects.map((item: IProjectDetails) => {
                    const slug = slugify(item.title)
                    return (
                      <SwiperSlide key={slug}>
                        <ProjectCard {...item} link={`/projects/${item.title.toLowerCase().replace(/[\s-]/g, "")}`} />
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </Box>
            </MuiGrid>
          </MuiGrid>
        </Box>
        <Box sx={{ display: upMd ? 'flex' : 'none', width: '3%', position: 'relative' }}>
          <IconButton onClick={handleNext} sx={{ position: 'absolute', top: '45%', transform: 'translateY(-45%)' }}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </Box>
      </Container >

    </>
  );
};

export default Projects;