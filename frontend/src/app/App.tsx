import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthorizedContent } from "./AuthorizedContent.js";
import { Login } from "./Login.js";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthorizedContent />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}