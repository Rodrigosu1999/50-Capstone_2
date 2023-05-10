import { BrowserRouter } from "react-router-dom";
import "../styles/App.css";
import Routes from "./Routes";
import NavBar from "./NavBar";
import ContextProvider from "./ContextProvider";

//Our main App, here we are passing our context and rendering our routes and navbar 
function App() {

  return (
    <div className="App">
      <ContextProvider>
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes />
        </main>
      </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
