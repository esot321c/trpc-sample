import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import dayjs from 'dayjs';

const Roadmap = (data: any) => {
  const timelineItems = data
    ? data.data.map((roadmap: any) => {
      return { ...roadmap, date: Date.parse(roadmap.date) };
    })
    : [];
  return (
    <Timeline>
      {timelineItems.map((item: any) => {
        const itemTime = dayjs(item.date).toString()
        return (
          <TimelineItem
            key={item.name}
            sx={{
              '&::before': {
                p: 0,
                flex: 'none',
              },
            }}
          >
            <TimelineSeparator>
              <TimelineDot>
                <Icon sx={{ color: 'rgb( 29, 29, 32 )' }}>check_circle</Icon>
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h5" sx={{ mt: '-3px' }}>
                {item.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {itemTime}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1rem', mb: 1 }}>
                {item.description}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export default Roadmap;
