import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import { useSession, SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
