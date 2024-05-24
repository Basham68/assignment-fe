import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import AuthContextProvider from "./context/authContext";

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
