import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";

import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-jlr8kifhpcxo3iyv.us.auth0.com"
    clientId="1obWnOhrgykHs3Jd0FBaczoOEFjY8Rss"
    // authorizationParams={{
    //   redirect_uri: window.location.origin,
    // }}
    // useRefreshTokens={true}
    redirectUri={window.location.origin}
  >
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </Auth0Provider>
);
