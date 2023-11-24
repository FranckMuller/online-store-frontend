"use client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/app/components/modules/Header/Header";
import { useAuth } from "@/hooks/useAuth";
import { inter } from "./ui/fonts";
import { store } from "@/store/store";
import type { AxiosError } from "axios";

import styles from "./layout.module.scss";
import "./globals.scss";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const RootLayout = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <html lang="en">
          <body className={`${inter.className}`}>
            <Header />
            <main className={styles["main"]}>{children}</main>
          </body>
        </html>
      </Provider>
    </QueryClientProvider>
  );
};

export default RootLayout;
