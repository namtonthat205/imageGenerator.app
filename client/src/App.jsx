import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Home, CreatePost } from './pages';
import LoginForm from './_auth/forms/LogInForm';
import SignUpForm from './_auth/forms/SignUpForm';
import AuthLayout from './_auth/forms/AuthLayout';
import { Toaster } from "@/components/ui/toaster";
import { useUserContext } from './context/AuthContext';

const App = () => {
  // Define routes where the header should not be shown
  const { isAuthenticated } = useUserContext();
  const location = useLocation();
  const shouldHideHeader = () => {
    if(isAuthenticated)
    {
      return
    }
    const hideHeaderOnRoutes = ['/login', '/signup'];
    return hideHeaderOnRoutes.includes(location.pathname);
  }

  // Define routes where the header should be hidden (e.g., login, signup)

  // Implicit return with conditional rendering for the header
  return (
    <>
    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        {/* Define your routes here */}
        <Routes>
          {/* Home and Create Post routes */}
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />

          {/* Authentication routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
          </Route>
        </Routes>
        <Toaster />
      </main>
    </>
  );
};

export default App;
