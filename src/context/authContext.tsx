import { PropsWithChildren, createContext, useContext, useState } from "react";

type User = {
  email: string;
  _id: string;
  name: string;
};

type AuthState = {
  user?: User | null;
  token?: string | null;
};

const authContext = createContext<
  AuthState & {
    setUser: (state: AuthState) => void;
  }
>({
  token: null,
  user: null,
  setUser: () => {},
});

export const useAuthContext = () => useContext(authContext);

export default function AuthContextProvider(props: PropsWithChildren) {
  const [user, setUser] = useState<AuthState>({ user: null, token: null });

  const handleSetUser = ({ token, user }: AuthState) =>
    setUser({ user, token });

  return (
    <authContext.Provider value={{ ...user, setUser: handleSetUser }}>
      {props.children}
    </authContext.Provider>
  );
}
