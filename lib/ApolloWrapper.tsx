"use client"

import { ApolloLink, createHttpLink, HttpLink } from "@apollo/client";

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


  // Declare your endpoints

  // const balance1Endpoint = new HttpLink({
  //   uri: `http://localhost:8080/chains/${CHAIN}/applications/${FUN1_APP_ID}`,
  //   fetchOptions: { cache: "no-store" }
  // })
  // const balance2Endpoint = new HttpLink({
  //   uri: `http://localhost:8080/chains/${CHAIN}/applications/${FUN2_APP_ID}`,
  //   fetchOptions: { cache: "no-store" }
  // })

  return new ApolloClient({
    // use the `InMemoryCache` from "@apollo/experimental-nextjs-app-support"
    cache: new InMemoryCache(),
    link: multiHttpLink,
  });
  

}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
