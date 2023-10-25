

import React, { FC, useEffect, useState } from 'react';
import { Alert, Collapse, Box, Typography, Paper, TextField, FilledInput } from '@mui/material';
import { formatNumber, roundToTwo } from '@lib/utils/general';

type FisoFullCardProps = {
  stakepoolData: TFullStakePool;
  projectSlug: string;
}

const FisoFullCard: FC<FisoFullCardProps> = ({ stakepoolData, projectSlug }) => {

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h6">
        {stakepoolData.ticker}
      </Typography>
      <Typography color="text.secondary">
        {stakepoolData.name}
      </Typography>
      <Typography>
        Active stake: {formatNumber(Number(stakepoolData.stats.active_stake) * 0.000001)} ₳
      </Typography>
      <Typography>
        Fixed Fee: {Number(stakepoolData.stats.fixed_cost) * 0.000001} ₳
      </Typography>
      <Typography>
        Margin cost: {roundToTwo(stakepoolData.stats.margin_cost * 100)}%
      </Typography>
      <Typography>
        Delegators: {stakepoolData.stats.live_delegators}
      </Typography>
      <Typography>
        Saturation: {roundToTwo(stakepoolData.stats.live_saturation * 100)}%
      </Typography>
    </Paper>
  );
};

export default FisoFullCard;
