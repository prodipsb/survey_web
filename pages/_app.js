import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store, { persistor } from "../redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import { useRouter } from "next/router";
import Sidebar from "../components/sidebar/Main";

const App = ({ Component, pageProps }) => {
  const { pathname } = useRouter();
  const withoutLayout = ["/login", "/_error"];
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster position="top-center" />
        {withoutLayout.includes(pathname) ? (
          <Component {...pageProps} />
        ) : (
          <Sidebar>
            <Component {...pageProps} />
          </Sidebar>
        )}
      </PersistGate>
    </Provider>
  );
};

export default App;
