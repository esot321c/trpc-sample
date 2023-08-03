import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import { useRouter } from "next/router";
import {
  Grid,
  Box,
  Backdrop,
  CircularProgress
} from "@mui/material";
import { useSession } from "next-auth/react"

const variants = {
  hidden: { opacity: 0, x: 0, y: 500 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [backdrop, setBackdrop] = useState(true)

  useEffect(() => {
    setBackdrop(false)
  }, [])

  const { data: session } = useSession()

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Coinecta Finance</title>
      </Head>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          opacity: backdrop ? '1' : '0',
          width: '100vw',
          height: '100vh',
          background: 'rgba(24,28,33,1)',
          zIndex: 999,
          color: '#fff',
          transition: 'opacity 500ms',
          pointerEvents: backdrop ? 'auto' : 'none'
        }}
      >
        <CircularProgress color="inherit" sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }} />
      </Box>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          pt: '70px', // give space for floating navbar
        }}
      >
        <Box sx={{ flexGrow: '1', height: '100%' }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Layout;