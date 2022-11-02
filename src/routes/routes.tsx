import {Routes as Switch, Route} from 'react-router-dom';
import Home from '../pages/home/Home';


const Routes = () => {
  return (
    <Switch>
        <Route index path="/" element={<Home />} />
    </Switch>
  )
}

export default Routes