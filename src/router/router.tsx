import { Navigate, createBrowserRouter } from "react-router-dom";
import HomeScreen from "../screens/homeScreen";
import LoginScreen from "../screens/loginScreen";
import SignupScreen from "../screens/signupScreen";
import { PropsWithChildren } from "react";
import { useAuthContext } from "../context/authContext";

const PrivateRoutesMiddleWare = (props: PropsWithChildren) => {
  const { user } = useAuthContext();
  if (!user) return <Navigate to="/login" replace />;
  return props.children;
};
const AuthRoutesMiddleWare = (props: PropsWithChildren) => {
  const { user } = useAuthContext();
  if (user) return <Navigate to="/" replace />;
  return props.children;
};

export const router = createBrowserRouter([
  {
    index: true,
    element: (
      <PrivateRoutesMiddleWare>
        <HomeScreen />
      </PrivateRoutesMiddleWare>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthRoutesMiddleWare>
        <LoginScreen />
      </AuthRoutesMiddleWare>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthRoutesMiddleWare>
        <SignupScreen />
      </AuthRoutesMiddleWare>
    ),
  },
]);
