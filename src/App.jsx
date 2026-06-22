import { RouterProvider, useRouter } from './router/router';
import { InquiryProvider } from './context/InquiryContext';
import Header from './components/Header';
import Footer from './components/Footer';
import InquiryDrawer from './components/InquiryDrawer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Wholesale from './pages/Wholesale';
import Contacts from './pages/Contacts';
import NotFound from './pages/NotFound';

function Router() {
  const { route } = useRouter();
  const segments = route.segments || [];
  const [first, second] = segments;

  if (!first) return <Home />;
  if (first === 'catalog') return <Catalog />;
  if (first === 'product' && second) return <ProductDetail />;
  if (first === 'about') return <About />;
  if (first === 'wholesale') return <Wholesale />;
  if (first === 'contacts') return <Contacts />;
  return <NotFound />;
}

function App() {
  return (
    <RouterProvider>
      <InquiryProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
          <InquiryDrawer />
        </div>
      </InquiryProvider>
    </RouterProvider>
  );
}

export default App;
