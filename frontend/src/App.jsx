import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Layout"
import DashboardClassicV2 from "./DashboardClassicV2"
import AboutPage from "./pages/ABoutPage"
import FounderPage from "./pages/FounderPage"
import BugReportForm from "./pages/BugReportForm "
import HelpFAQ from "./pages/HelpFAQ"
import Login from "./pages/Login" 
import Signup from "./pages/Signup"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <DashboardClassicV2 />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "founder",
        element: <FounderPage />,
      },
      {
        path: "bug-report",
        element: <BugReportForm />,
      },
      {
        path: "help-faq",
        element: <HelpFAQ />,
      },
      {
        path: "log-in",
        element: <Login/>
      },
      {
        path:"sign-up",
        element: <Signup/>
      }
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App