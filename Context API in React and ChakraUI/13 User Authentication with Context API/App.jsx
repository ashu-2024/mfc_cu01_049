// App.jsx
import React from 'react';
import { AuthProvider } from './AuthContext';
import Navbar from './Navbar';
import Main from './Main';
import Footer from './Footer';

function App() {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Main />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
