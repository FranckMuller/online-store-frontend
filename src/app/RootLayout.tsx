"use client";
import { useState, useRef } from "react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { inter } from "@/app/ui/fonts";
import { type AppStore, makeStore } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";

import styles from "@/app/layout.module.scss";
import "@/app/globals.scss";

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false
          }
        }
      })
  );
  const storeRef = useRef<AppStore>();
  
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  persistStore(storeRef.current);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={storeRef.current}>
        <html lang="en">
          <body className={`${inter.className}`}>{children}</body>
        </html>
      </Provider>
    </QueryClientProvider>
  );
};

export default RootLayout;
