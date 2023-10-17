import React from "react";
import { CookiesProvider } from "react-cookie";
import AppRouter from "./AppRouter";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
      <div className="page">
        <div className="page_content">
          <RecoilRoot>
            <QueryClientProvider client={queryClient}>
              <CookiesProvider>
                <AppRouter />
              </CookiesProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </RecoilRoot>
        </div>
      </div>
  );
}

export default App;