import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.module.css';
import TheHeader from './components/layout/TheHeader';
import CharacterPage from './pages/CharacterPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <TheHeader />
      <main>
        <Switch>
          <Route path='/' exact>
            <HomePage />
          </Route>
          <Route path='/characters/:id' exact>
            <CharacterPage />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
