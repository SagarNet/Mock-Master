import { useState } from "react";
import Login from "./Login";
import Hero from "./Hero";
import Header from "./Header";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    console.log("Login successful!");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      <main className="pt-16">
        {" "}
        {/* Padding for fixed header */}
        {isAuthenticated ? (
          <Hero />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </main>
    </div>
  );
};

export default App;
