import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './index.css';  // Relative path to the CSS file
import { AuthProvider } from "@/context/AuthContext";
import { QueryProvider } from "@/lib/appwrite/react-query/QueryProvider";

import App from "./App";

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <BrowserRouter> {/* BrowserRouter should wrap AuthProvider */}
      <AuthProvider>
        <QueryProvider>
          <App />
        </QueryProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  
)