import { BrowserRouter } from "react-router-dom";
import RouterApp from "./routes/RouterApp";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <RouterApp />
      </BrowserRouter>
    </>
  );
}

export default App;
