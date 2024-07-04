import type { AppProps } from "next/app";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "@/styles/globals.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthProvider, UserProfileProvider } from "@/providers";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Suspense fallback={'<h1> Loading</h1>'}>
      <AuthProvider>
        <UserProfileProvider>
          <Component {...pageProps} />
        </UserProfileProvider>
      </AuthProvider>
      <ToastContainer />
    </Suspense>
  );
}
