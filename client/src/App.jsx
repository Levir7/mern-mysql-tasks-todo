import { Route, Routes } from "react-router-dom"; // importamos routes para las rutas desde la pagina principal
import TasksPage from "./pages/TasksPage";
import TaskForm from "./pages/TaskForm";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import { TaskContextProvider } from "./context/TaskProvider";

const App = () => {
  return (
    <div className="bg-zinc-900 h-screen">
          <NavBar />
      <div className="container mx-auto px-20 py-5">
        <TaskContextProvider>
          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="/new" element={<TaskForm />} />
            <Route path="/edit/:id" element={<TaskForm />} />
            {/* Con el NotFound le indicamos que si busca algo que no encuentre en nuestras rutas muestre esa pagina */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TaskContextProvider>
      </div>
    </div>
  );
};

export default App;
