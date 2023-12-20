import React from "react";
import { LogicalPosition, appWindow, currentMonitor } from '@tauri-apps/api/window';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from './pages/Home.tsx';

currentMonitor().then(monitor => {
  appWindow.setPosition( new LogicalPosition(-7, 0))
  appWindow.setSize({
    type:'Physical',
    width: monitor?.size.width || 0,
    height: monitor?.size.height || 0
  })
});

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Home />
    }
  ])

  return (
    <React.StrictMode>
      <RouterProvider
        router={router}
      />
    </React.StrictMode>
  );
}

export default App;
