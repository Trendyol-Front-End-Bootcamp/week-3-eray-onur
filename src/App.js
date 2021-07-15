import { AnimatePresence } from 'framer-motion';
import { Route, Switch, useLocation } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import CharacterDetails from './pages/CharacterDetails/CharacterDetails';

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
