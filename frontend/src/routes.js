import React from 'react'
import {BrowserRouter,Switch, Route} from 'react-router-dom'
import App from './App'
import Signup from './auth/signup/signup'
import Signin from './auth/signin/Signin'
import Activate from './auth/Activate/Activate'
import Private from './auth/Private'
import Admin from './auth/Admin'
import Forgot from './auth/Forgot'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import Reset from './auth/Reset'
import MovieDetail from './core/MovieDetail'
import LandingPage from './core/LandingPage'
import FavoritePage from './core/FavoritePage'

const Routes = () => {
return(
    <BrowserRouter>
        <Switch>
            <Route path='/'exact component={LandingPage} />
            <Route path='/signup'exact component={Signup} />
            <Route path='/signin'exact component={Signin} />
            <Route path='/auth/activate/:token'exact component={Activate} />
            <PrivateRoute path='/private' exact component={Private} />
            <AdminRoute path='/admin' exact component={Admin} />
            <Route path='/auth/password/forgot'exact component={Forgot} />
            <Route path='/auth/password/reset/:token'exact component={Reset} />
            <Route exact path="/movie/:movieId" exact component={MovieDetail} />
            <PrivateRoute exact path="/favorites" exact component={FavoritePage} />
        </Switch>
    </BrowserRouter>
)

}

export default Routes;