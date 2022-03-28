import React from 'react';

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
import Categories from './Categories';
import Home from './Home';
import Profile from './Profile';

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100) // fake async
    },
    signout(cb) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

const Main = () => {
    return (
        <Router>
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">Marketplace Tani</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <Link class="nav-item nav-link " to="/">Home</Link>
                            <Link class="nav-item nav-link " to="/categories">Kategori</Link>
                            <Link class="nav-item nav-link " to="/profile">Profile Kami</Link>

                        </div>
                    </div>
                </nav>

                <div className="container">
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/auth">
                            <LoginPage />
                        </Route>
                        <PrivateRoute path="/categories">
                            <Categories />
                        </PrivateRoute>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    )

}

export default Main

function AuthButton() {
    let history = useHistory();

    return fakeAuth.isAuthenticated ? (
        <p>
            <button
                onClick={() => {
                    fakeAuth.signout(() => history.push("/"))
                }}
            >
                Sign Out
            </button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    );
}

function PrivateRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                fakeAuth.isAuthenticated ? (
                    <div>
                        <AuthButton />
                        {children}
                    </div>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/auth",
                            state: { from: location }
                        }}
                    />
                )
            }
        ></Route>
    );
}

function LoginPage() {
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
            <p>Maaf silahkan login terlebih dahulu untuk melanjutkan</p>
            <button onClick={login}>Log in</button>
        </div>
    );
}