import { useMutation } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../common/context/userContext";
import style from "./Auth.module.css";
import { LOG_IN, SIGN_UP } from "./AuthMutations";
type modeType = "logIn" | "signUp";
type authCredType = {
  username?: string;
  email: string;
  password: string;
};
export default function Auth() {
  const router = useRouter();

  const [mode, setMode] = useState("logIn" as modeType);

  const { setUser } = useContext(UserContext);

  const { register, handleSubmit } = useForm({ mode: "onBlur" });

  const [errors, setErrors] = useState(false);
  
  const [logInMutation] = useMutation(LOG_IN);
  const [signUpMutation] = useMutation(SIGN_UP);

  const signUp = async ({ username, email, password }: authCredType) => {
    try {
    const signUpData =  await (await signUpMutation({ variables: { username, email, password } })).data
      
         setUser(signUpData.signUp);
         router.push("/");
    } catch (error) {
      error?.graphQLErrors?.forEach((e: any) => {
        e.extensions?.code === "BAD_USER_INPUT" && setErrors(true);
      });
    }
   
  };

  const logIn = async ({ email, password }: authCredType) => {
    try {
     const logInData = await (await logInMutation({ variables: { email, password } })).data
        setUser(logInData.logIn);
        router.push("/");
    } catch (error) {
      error?.graphQLErrors?.forEach((e: any) => {
        e.extensions?.code === "BAD_USER_INPUT" && setErrors(true);
      });
    }

  };

  //TODO Error check
  //TODO Preloader
  return (
    <div>
      <div className={style.switcher}>
        <span onClick={() => setMode("signUp")}>Регистрация</span>
        <span onClick={() => setMode("logIn")}>Вход</span>
      </div>
      {mode === "logIn" ? (
        <form className={style.form} onSubmit={handleSubmit(logIn)}>
          <input
            {...register("email", { required: true })}
            type="text"
            placeholder="example@email.com"
          />
          <input
            {...register("password", { required: true })}
            type="text"
            placeholder="*****"
          />
          {errors && (
            <div>
              <span className={style.error}>Неверный логин или пароль</span>
            </div>
          )}
          <span>Забыли пароль?</span>
          <br />
          <button>Войти</button>
        </form>
      ) : (
        <form className={style.form} onSubmit={handleSubmit(signUp)}>
          <input
            {...register("username", { required: true })}
            placeholder="Имя"
            type="text"
          />
          <input
            {...register("email", { required: true })}
            placeholder="Электронная почта"
            type="text"
          />
          <input
            {...register("password", { required: true })}
            placeholder="Пароль"
            type="text"
          />
          {/* <input placeholder="Подтвердите пароль" type="password" /> */}
          {errors && (
            <span className={style.error}>Такой email уже зарегестрирован</span>
          )}
          <button className={style.signUp_btn}>Зарегестрироваться</button>
        </form>
      )}
    </div>
  );
}
