import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login, HomePage } from "./pages";
import { Header } from "./components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: (
      <div>
        <h1>Not Found</h1>
      </div>
    ),
  },
]);
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
