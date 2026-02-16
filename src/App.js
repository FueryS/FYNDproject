import "./App.css";

import Nav from "./Nav/nav.jsx";
import BWmain from "./Body/bodywrapper.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} />
      <div className="nav">
        <Nav />
      </div>
      <div className="body">
        <BWmain />
      </div>
    </>
  );
}

export default App;
