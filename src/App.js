import React from 'react';
import UploadInterface from './components/filesUpload/UploadInterface'
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import NotFound from './components/NotFound';


function App() {

  return (
    <div className="all">
      <BrowserRouter>
        <Switch>
          <Route exact path={["", "/download/:id"]}>
            <UploadInterface />
          </Route>
          <Route exact path='/signin'>
            <SignIn />
          </Route>
          <Route exact path='/signup'>
            <SignUp />
          </Route>
          <Route exact path='*'>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
