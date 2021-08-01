import { createContext } from "react";
import { userType } from "../types/userType";
//@ts-ignore
export const UserContext = createContext<{user: userType | undefined, setUser: Dispatch<SetStateAction<userType | undefined>>}>();
