import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Login from "./";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UserActionsInfo from "./components/UIsmallComponents/UserActionsInfo";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <AppRouter />
        <UserActionsInfo />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
