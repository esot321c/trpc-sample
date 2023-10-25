import React, { FC, useState } from 'react';
import { Alert, Collapse, Box, Typography } from '@mui/material';
import { trpc } from '@lib/utils/trpc';
import { useWalletContext } from '@contexts/WalletContext';
import { calculatePageRange } from '@server/utils/userRewardsIspo';

type ContributeTabProps = {

}

const ContributeTab: FC<ContributeTabProps> = () => {
  const { providerLoading, setProviderLoading, sessionStatus, sessionData, fetchSessionData } = useWalletContext()
  const checkVerificationResult = trpc.user.getSumsubResult.useQuery()


  // Example usage:
  const strategy1 = calculatePageRange(12, 21, 100);
  const strategy2 = calculatePageRange(27, 67, 412);
  const strategy3 = calculatePageRange(27, 67, 620);
  const strategy4 = calculatePageRange(450, 650, 620);



  return (
    <>
      <Typography>
        Contribute
      </Typography>
      <Typography>
        {JSON.stringify(strategy1)}
      </Typography>
      <Typography>
        {JSON.stringify(strategy2)}
      </Typography>
      <Typography>
        {JSON.stringify(strategy3)}
      </Typography>
      <Typography>
        {JSON.stringify(strategy4)}
      </Typography>


    </>
  );
};

export default ContributeTab;
