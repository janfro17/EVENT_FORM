import './App.css';
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import EventAddFrom from "./components/EventAddForm";
import EventView from "./components/EventView";
import EventList from "./components/EventList";

function NotFoundPage() {
  return <div className="page">🧐404, It's not exist</div>;
}

function App() {
  const [ID, setID] = useState('');
  const handleID = (id) => {
    setID(id)};

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<EventList handleID={handleID} />} />
      <Route path='/event' element={<EventView ID={ID} />}/>
      <Route path="/add-event" element={<EventAddFrom />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
  </BrowserRouter>
}


export default App;
