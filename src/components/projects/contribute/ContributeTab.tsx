import React, { FC, useState } from 'react';
import { Alert, Collapse, Box, Typography } from '@mui/material';
import { trpc } from '@lib/utils/trpc';
import { useWalletContext } from '@contexts/WalletContext';

type ContributeTabProps = {

}

const ContributeTab: FC<ContributeTabProps> = () => {
  const { providerLoading, setProviderLoading, sessionStatus, sessionData, fetchSessionData } = useWalletContext()
  const checkVerificationResult = trpc.user.getSumsubResult.useQuery()

  return (
    <>
      <Typography>
        Contribute
      </Typography>
    </>
  );
};

export default ContributeTab;
