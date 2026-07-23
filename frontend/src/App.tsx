import Dashboard from "./components/molecule/Dashborad";
import DashboardEdit from "./components/molecule/DashboradEdit";
import { Header } from "./components/molecule/Header";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom"; // Import router components
import Login from "./components/molecule/Login";
import CategoryPage from "./components/molecule/CategoryPage";

function App() {
  return (
    <main className="bg-neutral-100 dark:bg-neutral-950 w-full h-full min-h-screen flex flex-col justify-start items-center">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />

          <Route element={<LayoutWithHeader />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profilepage" element={<DashboardEdit />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
}
const LayoutWithHeader = () => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-center max-w-screen-xl">
      <Header />
      <Outlet />
    </div>
  );
};
export default App;
