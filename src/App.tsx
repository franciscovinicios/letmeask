import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/Home";
import { AdminRoom } from "./pages/AdminRoom";
import { Room } from "./pages/Room";
import { AuthContextProvider } from "./contexts/AuthContext";


import { Routes, BrowserRouter, Route } from 'react-router-dom'


function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
          <Route path="/rooms/:id" element={<Room />} />
          <Route path="/admin/rooms/:id" element={<AdminRoom />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
