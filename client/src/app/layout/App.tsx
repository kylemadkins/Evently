import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "semantic-ui-css/semantic.min.css";
import "react-calendar/dist/Calendar.css";
import "react-toastify/ReactToastify.min.css";

function App() {
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <Outlet />
    </>
  );
}

export default App;
