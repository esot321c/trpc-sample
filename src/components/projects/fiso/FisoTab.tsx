

import React, { FC, useEffect, useState } from 'react';
import { Alert, Collapse, Box, Typography, Paper, TextField, FilledInput } from '@mui/material';
import { trpc } from '@lib/utils/trpc';
import { useWalletContext } from '@contexts/WalletContext';
import { stakepools } from '@lib/stakepools';
import FisoFullCard from './FisoFullCard';
import Grid from '@mui/system/Unstable_Grid/Grid';

type FisoTabProps = {
  fisoPoolIds: string[]
  projectSlug: string;
}

const FisoTab: FC<FisoTabProps> = ({ fisoPoolIds, projectSlug }) => {
  const { sessionStatus } = useWalletContext()
  const stakepoolInfo = trpc.stakepool.stakepoolInfo.useMutation()
  const [stakepoolData, setStakepoolData] = useState<any>([])

  useEffect(() => {
    if (fisoPoolIds?.length > 0) getStakepoolData()
  }, [fisoPoolIds])

  const getStakepoolData = async () => {
    try {
      const response = await stakepoolInfo.mutateAsync({ stakepoolIds: fisoPoolIds });
      console.log(response);
      setStakepoolData(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box sx={{ mb: 2 }}>
      {stakepoolInfo.isLoading
        ? <Box sx={{ mb: 1 }}>
          Loading...
        </Box>
        : stakepoolInfo.isError
          ? <Box sx={{ mb: 1 }}>
            Error fetching stakepool info
          </Box>
          : stakepoolData.successfulStakePools?.length > 0
            ? <Box>
              <Grid container spacing={2}>
                {stakepoolData.successfulStakePools.map((item: TFullStakePool, i: number) => {
                  return (
                    <Grid xs={12} sm={6} md={4} key={`ispo-card-${item.hex}`}>
                      <FisoFullCard stakepoolData={item} projectSlug={projectSlug} />
                    </Grid>
                  )
                })}
              </Grid>
            </Box>
            : <Box sx={{ mb: 1 }}>
              No ISPO info to display...
            </Box>
      }
    </Box>
  );
};

export default FisoTab;
