// App.js
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

// Main App component with routing and basic layout
function App() {
  return (
    <Router>
    {/* Flex column layout to push footer to the bottom */}
      <div className="flex flex-col min-h-screen animated-bg">
        <Navbar />
        <main className="flex-grow">
          <Home />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
