import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";

/**
 * App
 * --------------------------------------------------
 * Root application component.
 *
 * - Provides global toast notifications via <Toaster />
 * - Configures client-side routing with React Router
 * - Defines fallback route for unknown pages
 */
function App() {
  return (
    <>
      {/* Toast Notifications */}
      <Toaster />

      {/* Router Setup */}
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
