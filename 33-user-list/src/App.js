import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./UserList";
import AlbumList from "./AlbumList";
import PhotoList from "./PhotoList";
import NotFound from "./NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/albums" element={<AlbumList />} />
        <Route path="/photos" element={<PhotoList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
