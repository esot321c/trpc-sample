import React, { FC } from 'react';
import { Box, Typography, useTheme, Paper } from '@mui/material';

import TimeRemaining from '@components/TimeRemaining';
import { LinearProgressStyled } from '@components/styled-components/LinearProgress';
import Grid from '@mui/system/Unstable_Grid/Grid';

type ProRataFormProps = {

}

// details: 
//   - target
//   - amount deposited
//   - amoutn of tokens claimed
//   - tokenomics info
//   - price summary

// individual user's details
//   - my amount deposited
//   - my percent share of the total
//   - if its a pool-weight, my pool weight
//   - my guaranteed allocation

// contribute
//   - terms and conditions
//   - amount available in your wallet
//   - amount to deposit
//   - amount of token you'll get
//   - deposit button
//   - bonus? 

const ProRataForm: FC<ProRataFormProps> = () => {
  const theme = useTheme()

  return (
    <Paper variant="outlined" sx={{ px: 3, py: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          mb: 2,
          textAlign: 'center'
        }}
      >
        <Box>
          <Typography variant="overline">
            Round open
          </Typography>
          <Typography variant="h4" sx={{ mt: -1 }}>
            <TimeRemaining noDay endTime={new Date(1698835989000)} />
          </Typography>
        </Box>
        <Box>
          <Typography variant="overline">
            Round closed
          </Typography>
          <Typography variant="h4" sx={{ mt: -1 }}>
            <TimeRemaining noDay endTime={new Date(1699008789000)} />
          </Typography>
        </Box>
      </Box>

      <Grid container>
        <Grid xs={12} md={8}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, }}>
            <Box>
              <Typography variant="overline">
                CNCT Target
              </Typography>
              <Typography variant="h6" sx={{ mt: -1 }}>
                20,000,000
              </Typography>
            </Box>
            <Box>
              <Typography variant="overline">
                CNCT Claimed
              </Typography>
              <Typography variant="h6" sx={{ mt: -1 }}>
                20,000,000
              </Typography>
            </Box>
            <Box>
              <Typography variant="overline">
                Total raised
              </Typography>
              <Typography variant="h6" sx={{ mt: -1 }}>
                126%
              </Typography>
            </Box>
          </Box>
          <LinearProgressStyled
            variant="determinate"
            value={100}
            barColorStart={theme.palette.secondary.main}
            barColorEnd={theme.palette.secondary.light}
            sx={{ mb: 2 }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              mb: 2
            }}
          >
            <Box>
              <Typography variant="overline">
                Price
              </Typography>
              <Typography variant="h6" sx={{ mt: -1 }}>
                1 CNCT = 0.16 ₳
              </Typography>
            </Box>
            <Box>
              <Typography variant="overline">
                Ada Deposited
              </Typography>
              <Typography variant="h6" sx={{ mt: -1 }}>
                4,032,109 ₳
              </Typography>
            </Box>
            <Box>
              <Typography variant="overline">
                Ada to be refunded
              </Typography>
              <Typography variant="h6" sx={{ mt: -1 }}>
                832,109 ₳
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} md={4}>

        </Grid>
      </Grid>


    </Paper>
  );
};

export default ProRataForm;
