import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from './pages/Home.tsx';

function App() {
  const rounter = createBrowserRouter([
    {
      path:'/',
      element: <Home />
    }
  ])

  return (
    <React.StrictMode>
      <RouterProvider
        router={rounter}
      />
    </React.StrictMode>
  );
}

export default App;
