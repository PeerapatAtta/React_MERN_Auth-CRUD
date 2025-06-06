import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import FormComponent from './components/FormComponent';
import SingleComponent from './components/SingleComponent';

const MyRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/create" element={<FormComponent />} />
                <Route path="/blog/:slug" element={<SingleComponent />} />
            </Routes>
        </BrowserRouter>
    );
}

export default MyRoute;