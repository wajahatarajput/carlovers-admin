import type { AppProps } from "next/app";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "@/styles/globals.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, OrdersProvider, ProfileProvider } from "@/providers";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Suspense fallback={'<h1> Loading</h1>'}>
      <AuthProvider>
        <ProfileProvider>
          <OrdersProvider>
            <Component {...pageProps} />
          </OrdersProvider>
        </ProfileProvider>
      </AuthProvider>
      <ToastContainer />
    </Suspense>
  );
}
