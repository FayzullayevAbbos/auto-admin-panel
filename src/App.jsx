import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./components/Login";
import SiderMY from "./components/Sider";
import Push from "./pages/Push";

function App() {
  const token = localStorage.getItem("token");

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/home",
      element: token ? (
        <SiderMY>
          <Home />{" "}
        </SiderMY>
      ) : (
        <Navigate to='/login' replace />
      ),
    },
    {
      path: "/brands",
      element: token ? (
        <SiderMY>
          <Push />
        </SiderMY>
      ) : (
        <Navigate to={"/login"} replace />
      ),
    },
    {
      path: "/",
      element: token ? (
        <Navigate to='/home' replace />
      ) : (
        <Navigate to='/login' replace />
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
