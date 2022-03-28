import logo from './logo.svg';
import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,

} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

export  function BasicExample(params) {
  return(
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
        <hr/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/about">
            <About/>
          </Route>
          <Route exact path="/dashboard">
            <Dashboard/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

function Home() {
  return(
    <div>
      <h2>Home</h2>
    </div>
  )
}

function About() {
  return(
    <div>
      <h2>About</h2>
    </div>
  )
}

function Dashboard() {
  return(
    <div>
      <h2>Dashboard</h2>
    </div>
  )
}

//=======================================================================

export function ParamsExample() {
  return(
    <Router>
      <div>
        <h2>Accounts</h2>
        <ul>
          <li>
            <Link to='/netflix'>Netflix</Link>
          </li>
          
          <li>
            <Link to='/gmail'>Gmail</Link>
          </li>
          
          <li>
            <Link to='/yahoo'>Yahoo</Link>
          </li>

          <li>
            <Link to='/amazon'>Amazon</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/:id" children={<Child />} />
        </Switch>
      </div>
    </Router>
  )
}

function Child() {
  let { id } = useParams();

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  )
}

//=======================================================================

export default function NestingExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

function Topics () {
  let { path, url } = useRouteMatch();
  console.log('path ', path)
  console.log('url ', url)
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${url}/Sate, Nasi goreng`}>Kuliner</Link>
        </li>
        <li>
          <Link to={`${url}/Wisata Alam, Museum`}>Traveling</Link>
        </li>
        <li>
          <Link to={`${url}/Ibis, JW Marriot`}>Review Hotel</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:topicId`}>
          <Topic />
        </Route>
      </Switch>
    </div>
  )
} 

const Topic = () => {
  let { topicId } = useParams()

  return(
    <div>
      <h3>{topicId}</h3>
    </div>
  )
}

//============================================================================

export function AuthExample() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const fakeAuth = {
    isAuthenticated: isAuthenticated,
    authenticate(cb) {
      fakeAuth.isAuthenticated = true;
      setIsAuthenticated(true);
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      setIsAuthenticated(false);
      fakeAuth.isAuthenticated = false;
      setTimeout(cb, 100);
    }
  };

  return (
    <Router>
      <div>
        <AuthButton fakeAuth={fakeAuth} isAuthenticated={isAuthenticated} />

        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/private">Private Page</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/public">
            <PublicPage />
          </Route>
          <Route path="/login">
            <LoginPage fakeAuth={fakeAuth} />
          </Route>
          <PrivateRoute path="/private" fakeAuth={fakeAuth}>
            <ProtectedPage />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

function AuthButton(props) {
  const { fakeAuth, isAuthenticated } = props;
  let history = useHistory();

  return isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

function PrivateRoute({ children, ...rest }) {
  const { fakeAuth } = rest;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Private</h3>;
}

function LoginPage(props) {
  const { fakeAuth } = props;

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
