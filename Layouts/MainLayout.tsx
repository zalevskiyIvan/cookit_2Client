import style from "../styles/MainLayout.module.css";
import Footer from "../Components/Footer";
import { useContext, useEffect } from "react";
import { UserContext } from "../common/context/userContext";
import { AUTH_CHECK } from "../Components/Auth/AuthQuery";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router";

export default function MainLayout({
  children,
  Header,
}: {
  children: React.ReactNode;
  Header: any;
}) {
  const { setUser } = useContext(UserContext);
  const router = useRouter()
  try {
    const { data } = useQuery(AUTH_CHECK);
    setUser(data.authCheck);
  } catch (error) {
     error.graphQLErrors?.forEach(
       (e: any) =>
         e.extensions?.code === "UNAUTHENTICATED" && router.push("/auth")
     );
  }
  


 
  return (
    <div>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.main}>
        <div className={style.content}>{children}</div>
        <div className={style.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
