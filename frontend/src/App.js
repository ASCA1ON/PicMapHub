import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlaces from "./places/pages/NewPlaces";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users />}/>
        <Route path="/new" element={<NewPlaces />}/>
        <Route path="/*" element={<Navigate to="/" replace/>} />
      </Routes>
    </Router>
  );
  }


export default App;
