import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import useRefreshCurrentUser from 'hooks/useRefreshCurrentUser';
import AppBar from 'components/AppBar';
import NotFound from 'components/NotFound';
import PublicRoute from 'components/PublicRoute';
import PrivateRoute from 'components/PrivateRoute';
import Loader from 'components/Loader';
import Footer from 'components/Footer';

const HomePage = lazy(() => import('pages/HomePage'));
const ContactsPage = lazy(() => import('pages/ContactsPage'));
const AddContactPage = lazy(() => import('pages/AddContactPage'));
const ChangeContactPage = lazy(() => import('pages/ChangeContactPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));

function App() {
  const { isRefreshing } = useRefreshCurrentUser();
  // console.log(isRefreshing);
  return (
    <>
      <AppBar />

      <Suspense fallback={<Loader />}>
        <>
          {!isRefreshing && (
            <Routes>
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <HomePage />
                  </PublicRoute>
                }
              />


              <Route path="/" element={<PrivateRoute />}>
                <Route path="/contacts" element={<ContactsPage />} />
              </Route>
              
              <Route
                path="/contacts/add"
                element={
                  <PrivateRoute>
                    <AddContactPage />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/contacts/edit/:contactId"
                element={
                  <PrivateRoute>
                    <ChangeContactPage />
                  </PrivateRoute>
                }
                />
                
              

                
              <Route
                path="/register"
                element={
                  <PublicRoute restricted>
                    <RegisterPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute restricted>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path="*"
                element={
                  <PublicRoute>
                    <NotFound />
                  </PublicRoute>
                }
              />
            </Routes>
          )}
        </>
      </Suspense>

      <Footer />
    </>
  );
}

export default App;