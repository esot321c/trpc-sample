import React, { FC, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  useTheme,
  useMediaQuery,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton
} from "@mui/material";
import { useWalletList, useAddress, useWallet } from '@meshsdk/react';
import { signIn, useSession } from "next-auth/react"; // Import signIn from next-auth

const WALLET_ADDRESS = "wallet_address_coinecta";
const WALLET_NAME = "wallet_name_coinecta";

interface ISignIn {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignIn: FC<ISignIn> = ({ open, setOpen, setLoading }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const wallets = useWalletList();
  const walletContext = useWallet()

  const handleClose = () => {
    setOpen(false)
  }

  const handleConnect = (walletName: string) => {
    setLoading(true)
    walletContext.connect(walletName)
    handleClose()
  }

  const handleProviderSignIn = (providerId: string) => {
    setLoading(true);
    handleClose();

    signIn(providerId)
      .then((result) => {
        console.log(result)
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "800",
            fontSize: "32px",
          }}
        >
          {walletContext.connected ? "Wallet Connected" : "Connect Wallet"}
        </DialogTitle>
        <DialogContent sx={{ minWidth: '350px', pb: 0 }}>
          {walletContext.connecting ? (
            <CircularProgress sx={{ ml: 2, color: "black" }} size={"1.2rem"} />
          ) : (
            <List>
              {/* Wallets */}
              {wallets.map((wallet, i) => {
                return (
                  <ListItemButton key={i} onClick={() => handleConnect(wallet.name)}>
                    <ListItemAvatar>
                      <Avatar alt={wallet.name + ' Icon'} src={wallet.icon} sx={{ height: '24px', width: '24px' }} variant="square" />
                    </ListItemAvatar>
                    <ListItemText primary={wallet.name} />
                  </ListItemButton>
                )
              })}
              {/* GitHub Provider */}
              <ListItemButton onClick={() => handleProviderSignIn("github")}>
                <ListItemAvatar>
                  <Avatar alt="GitHub Icon" src="/path/to/github-icon.png" sx={{ height: "24px", width: "24px" }} variant="square" />
                </ListItemAvatar>
                <ListItemText primary="GitHub" />
              </ListItemButton>
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close Window</Button>
          {walletContext.connected && (
            <Button
              onClick={() => walletContext.disconnect()}
            >
              Disconnect
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignIn;
