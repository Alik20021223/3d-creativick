import { Route, Routes } from 'react-router-dom';
import FaqPage from '@pages/faq-page';
import MainLayout from './layout/defaultLayout';
import MainPage from '@pages/main-page';

function App() {
  return (
    <>
      <Routes>
        {/* Родительский маршрут с layout */}
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<MainPage />} />
          <Route path='/faq' element={<FaqPage />} />
        </Route>
      </Routes>
      <Routes></Routes>
    </>
  );
}

export default App;
