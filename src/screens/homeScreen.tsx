import { useAuthContext } from "../context/authContext";

function HomeScreen() {
  const { setUser } = useAuthContext();

  const handleLogout = () => setUser({ user: null, token: null });

  return (
    <div className="stack justify-center align-center flex-1">
      <div className="card gap-1 stack">
        <h1>Welcome to the application</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default HomeScreen;
