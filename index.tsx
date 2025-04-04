import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Build from './build';
import Upload from './upload';

// ...existing code...

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/build" element={<Build />} />
            <Route path="/upload" element={<Upload />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);
