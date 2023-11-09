import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { Provider, useSelector } from "react-redux";
import store, { persistor } from "../redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import Sidebar from "../components/sidebar/Main";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster position="top-center" />
        {pathname.includes("login") ? (
          <Component {...pageProps} />
        ) : (
          <Sidebar>
            <Component {...pageProps} />
          </Sidebar>
        )}
      </PersistGate>
    </Provider>
  );
}
