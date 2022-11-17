import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageWrapper from 'components/layouts/PageWrapper';
import Home from 'pages/Home';
import Library from 'pages/Library';
import Work from 'pages/Work';
import NotFound from 'pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageWrapper />}>
          <Route index element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/works/:group/:media/:tree/*" element={<Work />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/404" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
