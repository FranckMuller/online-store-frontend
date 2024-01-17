"use client";
import {useState} from 'react'
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { inter } from "@/app/ui/fonts";
import { store } from "@/store/store";

import styles from "@/app/layout.module.scss";
import "@/app/globals.scss";

type Props = {
  children: React.ReactNode;
};

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//     },
//   },
// });

const RootLayout = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
}))
  
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <html lang="en">
          <body className={`${inter.className}`}>{children}</body>
        </html>
      </Provider>
    </QueryClientProvider>
  );
};

export default RootLayout;
