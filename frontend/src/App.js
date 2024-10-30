import React, { useState } from "react";
import Chat from "./components/Chat";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <div>
      {!token ? (
        <Login setToken={setToken} setUser={setUser} />
      ) : (
        <div>
          <Chat token={token} user={user} setToken={setToken} setUser={setUser} />
        </div>
      )}
    </div>
  );
}

export default App;
