// App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // remove BrowserRouter import
import { Provider, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import UserRegister from './components/auth/UserRegister';
import ProviderRegister from './components/auth/ProviderRegister';
import EmailVerification from './components/auth/EmailVerification';
import Services from './components/pages/Services';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Profile from './components/pages/Profile';
import SubCategory from './subCategory/SubCategory';
import NearbyProvidersModal from './subCategory/NearbyProviderModal';
import UserBookingsPage from './components/pages/Bookings';
import ChatPage from './components/pages/Chat';

function AppContent() {
  const location = useLocation();
  const { user, token } = useSelector((state) => state.auth);

  const hideFooter = location.pathname.startsWith('/chat/');

  const hideNavbar = location.pathname.startsWith('/chat/');
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {!hideNavbar && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="/provider-register" element={<ProviderRegister />} />
          <Route path="/verify-email/:token" element={<EmailVerification />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/services/:category/subcategories" element={<SubCategory />} />
          <Route path="/users/get-poviders/:categoryName/:subcategoryName" element={<NearbyProvidersModal />} />
          <Route path="/bookings" element={<UserBookingsPage />} />
          <Route path="/chat/:bookingId" element={<ChatPage currentUser={user} authToken={token} />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
