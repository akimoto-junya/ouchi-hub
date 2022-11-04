import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageWrapper from 'components/layouts/PageWrapper';
import Home from 'pages/Home';
import Library from 'pages/Library';
import Work from 'pages/Work';
import Test from 'pages/Test';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageWrapper />}>
          <Route index element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/work" element={<Work />} />
          <Route path="/test" element={<Test />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
