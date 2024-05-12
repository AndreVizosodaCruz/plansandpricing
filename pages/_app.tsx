import type { AppProps } from "next/app";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";
import GlobalStyle from "@/components/globalstyles";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SpeedInsights />
      <Analytics />
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
