import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import { useSession, SessionProvider } from "next-auth/react";
import StoreProvider from "./Store";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
