"use client"

import { createHttpLink } from "@apollo/client";

import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { AMM_APPLICATION_ID, FUN1_APP_ID, FUN2_APP_ID, CHAIN } from "@/constant/info";
import { MultiAPILink } from "@habx/apollo-multi-endpoint-link";



export const END_POINTS = {
      swap: `http://localhost:8080/chains/${CHAIN}/applications/${AMM_APPLICATION_ID}`,
      balance1: `http://localhost:8080/chains/${CHAIN}/applications/${FUN1_APP_ID}`,
      balance2: `http://localhost:8080/chains/${CHAIN}/applications/${FUN2_APP_ID}`,
}

function makeClient() {
  const multiHttpLink = new MultiAPILink({
    endpoints: {
      swap: `http://localhost:8080/chains/${CHAIN}/applications/${AMM_APPLICATION_ID}`,
      balance1: `http://localhost:8080/chains/${CHAIN}/applications/${FUN1_APP_ID}`,
      balance2: `http://localhost:8080/chains/${CHAIN}/applications/${FUN2_APP_ID}`,
    },
    createHttpLink: () => createHttpLink(),
    httpSuffix: '',
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: multiHttpLink,
    name: 'MunSwapApp',
    version: '1.0'
  });
  

}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
