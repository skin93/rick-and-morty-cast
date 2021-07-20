import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.module.css';
import TheHeader from './components/layout/TheHeader';
import CharacterPage from './pages/CharacterPage';
import EpisodePage from './pages/EpisodePage';
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
          <Route path='/episodes/:id' exact>
            <EpisodePage />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
