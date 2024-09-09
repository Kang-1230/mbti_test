import Layout from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import Router from "./shared/Router";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
