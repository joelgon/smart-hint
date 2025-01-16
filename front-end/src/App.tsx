import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './router';
import './global.css'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
