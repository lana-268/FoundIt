import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { ItemDetailsPage } from './pages/ItemDetailsPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ReportPage } from './pages/ReportPage';

export default function App() {
  return <div className="flex min-h-screen flex-col"><Header /><div className="flex-1"><Routes><Route path="/" element={<HomePage />} /><Route path="/items/:id" element={<ItemDetailsPage />} /><Route path="/report" element={<ReportPage />} /><Route path="*" element={<NotFoundPage />} /></Routes></div><Footer /></div>;
}
