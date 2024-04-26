import { BrowserRouter, Routes, Route } from "react-router-dom";
import Soda from "./Soda"
import Candy from "./Candy"
import Chips from "./Chips"
import Home from "./Home"
import NavBar from "./NavBar";

export default function VendingMachine() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/candy" element={<Candy/>} />
          <Route path="/chips" element={<Chips/>} />
          <Route path="/soda" element={<Soda/>} />
          <Route path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}