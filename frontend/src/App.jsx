import React from "react";
import {Routes, Route,BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import DeleteBook from "./pages/DeleteBook";
import ShowBooks from "./pages/ShowBooks";
import EditBook from "./pages/EditBook";
import CreateBooks from "./pages/CreateBooks";

const App=()=>{

  return (
  <BrowserRouter>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/create" element={<CreateBooks />}/>
      <Route path="/:id" element={<ShowBooks/>}/>
      <Route path="/edit/:id" element={<EditBook/>}/>
      <Route path="/delete/:id" element={<DeleteBook/>}/>
    </Routes>
  </BrowserRouter>

  ) 
}

export default App;