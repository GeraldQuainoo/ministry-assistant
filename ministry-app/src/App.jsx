import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Territory from "./components/Territory";

import MyStudents from "./components/MyStudents";

import Reports from "./components/Reports";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/territory" element={<Territory />}></Route>
          <Route path="/students" element={<MyStudents />} />
          <Route path="/report" element={<Reports />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
