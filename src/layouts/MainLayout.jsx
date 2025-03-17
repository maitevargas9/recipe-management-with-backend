import { Outlet } from 'react-router-dom';
import Header from "../components/shared/Header.jsx";

export default function MainLayout() {
  return (
    <>
        <Header />
      <main>
        <Outlet />
      </main>
      <footer>
      </footer>
    </>
  );
}