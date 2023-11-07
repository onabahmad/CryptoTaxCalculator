import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Main from "./Components/Main/Main";
import Sidecard from "./Components/Sidecard/Sidecard";
import Faq from "./Components/FAQ/Faq";
import Footer from "./Components/Footer/Footer";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Main />
        <Sidecard />
      </div>
      <Faq />
      <Footer />
    </div>
  );
};

export default App;
