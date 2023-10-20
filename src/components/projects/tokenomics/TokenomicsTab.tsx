import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import React, { FC } from 'react';
import Distribution from './Distribution';
import LinearTokenomics from './LinearTokenomics';

const TokenomicsTab: FC<{ tokenomics: TTokenomics }> = ({ tokenomics }) => {
  return (
    <>
      <Typography variant="h4" fontWeight="700">
        Tokenomics
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography color="text.secondary">
          Token Name:
          <Typography
            component="span"
            color="text.primary"
            sx={{ fontWeight: '700' }}
          >
            {' '}
            {tokenomics.tokenName}
          </Typography>
        </Typography>
        <Typography color="text.secondary">
          Token Ticker:
          <Typography
            component="span"
            color="text.primary"
            sx={{ fontWeight: '700' }}
          >
            {' '}
            {tokenomics.tokenTicker}
          </Typography>
        </Typography>
        <Typography color="text.secondary">
          Max Supply:
          <Typography
            component="span"
            color="text.primary"
            sx={{ fontWeight: '700' }}
          >
            {' '}
            {tokenomics.totalTokens.toLocaleString(navigator.language, {
              maximumFractionDigits: 0,
            })}
          </Typography>
        </Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">
          Visual Breakdown
        </Typography>
        {tokenomics.tokenomics.length > 0 ? (
          <LinearTokenomics tokenomics={tokenomics?.tokenomics} />
        ) : <Typography>Coming soon</Typography>}
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">
          Vesting Schedule
        </Typography>
        {tokenomics.tokenomics.length > 0 ? (
          <Distribution
            data={tokenomics.tokenomics}
          />
        ) : <Typography>Coming soon</Typography>}
      </Box>
    </>
  );
};

export default TokenomicsTab;
