import "../styles/globals.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
} from "@apollo/client";
import { UserContext } from "../common/context/userContext";
import { useEffect, useState } from "react";
import { userType } from "../common/types/userType";
import { AUTH_CHECK } from "../Components/Auth/AuthQuery";

const client = new ApolloClient({
  uri: "http://localhost:3001/",
  cache: new InMemoryCache(),
  credentials: "include",
});

function MyApp({ Component, pageProps }: any) {
  return <Container Component={Component} pageProps={pageProps} />;
}
const Container = ({ Component, pageProps }: any) => {
  const [user, setUser] = useState(undefined as undefined | userType);

  // if (!user) {
  //   router.push('/auth')
  // }

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={{ user, setUser }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </ApolloProvider>
  );
};
export default MyApp;
