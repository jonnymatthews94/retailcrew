import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/auth-context';
import { UserProvider } from './contexts/user-context';
import { AppLayout } from './components/layout/app-layout';
import { HomePage } from './pages/home';
import { BrandsPage, BrandPage } from './pages/brands';
import { SignupPage } from './pages/auth/signup';
import { LoginPage } from './pages/auth/login';
import { ForgotPasswordPage } from './pages/auth/forgot-password';
import { CategoryPage } from './pages/brands/category';
import { AccountSettingsPage } from './pages/account/settings';
import { RetailerOnboardingPage } from './pages/retailers/onboarding';
import { ContactPage } from './pages/contact';
import { TermsPage } from './pages/legal/terms';
import { PrivacyPage } from './pages/legal/privacy';
import { DebugLogger } from './components/debug/logger';

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <UserProvider>
          <Router>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/brands" element={<BrandsPage />} />
                <Route path="/brands/:brandId" element={<BrandPage />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/account/settings" element={<AccountSettingsPage />} />
                <Route path="/list-your-brand" element={<RetailerOnboardingPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
              </Route>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            </Routes>
            <DebugLogger />
          </Router>
        </UserProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}