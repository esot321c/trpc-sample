import React, { useState, useEffect } from "react";
import "@styles/globals.css";
import type { AppProps } from "next/app";
import { DarkTheme, LightTheme } from "@styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "@components/layout/Layout";
import Head from "next/head";
import { ThemeContext } from "@contexts/ThemeContext";
import { UserContext } from "@contexts/UserContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AlertWrapper, { IAlertMessages } from "@components/AlertWrapper";
import { MeshProvider } from "@meshsdk/react";
import { trpc } from '@utils/trpc';
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [theme, setTheme] = useState(LightTheme);
  const [userInfo, setUserInfo] = useState({ address: "" });
  const [alert, setAlert] = useState<IAlertMessages[]>([]);

  useEffect(() => {
    setTheme(
      localStorage.getItem("darkToggle") === "dark" ? DarkTheme : LightTheme
    );
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=yes"
        />
      </Head>
      <SessionProvider session={session}>
        <LocalizationProvider
          // @ts-ignore
          dateAdapter={AdapterDayjs}
        >
          <ThemeProvider theme={theme}>
            <ThemeContext.Provider value={{ theme, setTheme }}>
              <MeshProvider>
                <UserContext.Provider value={{ userInfo, setUserInfo }}>
                  <CssBaseline enableColorScheme />
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                  <AlertWrapper
                    alerts={alert}
                    close={(i: number) => {
                      setAlert((prevState) =>
                        prevState.filter((_item, idx) => idx !== i)
                      );
                    }}
                  />
                </UserContext.Provider>
              </MeshProvider>
            </ThemeContext.Provider>
          </ThemeProvider>
        </LocalizationProvider>
      </SessionProvider>
    </>
  );
}

export default trpc.withTRPC(MyApp);