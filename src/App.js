import { AnimatePresence, motion } from 'framer-motion';
import { Route, Switch, BrowserRouter, useLocation, Router } from 'react-router-dom';
import Homepage from './pages/Homepage';
import CharacterDetails from './pages/CharacterDetails';

function App() {

  const location = useLocation();

  return (
    <div className="container">
      <AnimatePresence>
          <Switch
            location={location}
            key={location.pathname}
          >
          <Route path='/character_details/:id' component={CharacterDetails} />
          <Route path='' exact component={Homepage} />
        </Switch>
      </AnimatePresence>
    </div>
  );
}

export default App;
