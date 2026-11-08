import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Practice from './pages/Practice/Practice';
import Results from './pages/Results/Results';
import './index.css';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
      </BrowserRouter>
    </Provider>
  );
}
