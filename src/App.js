import React,{ Suspense } from 'react';
import {
 BrowserRouter as Router,
 Route,
 Switch
} from 'react-router-dom';
import './App.css';

import AuthContext from './context/authcontext';
import useAuth from './hooks/useAuth'

const Home = React.lazy(()=> import('./pages/home'));
const Signup = React.lazy(()=> import('./pages/signup'));
const Login = React.lazy(()=> import('./pages/login'));
const Corporate = React.lazy(()=> import('./pages/corporate'));
const Upload = React.lazy(()=> import('./pages/upload'));
const Accounts = React.lazy(()=> import('./pages/accounts'));
const Declaredetail = React.lazy(()=> import('./pages/declaredetail'));
const BillList = React.lazy(()=> import('./pages/bills'));
const Terminals = React.lazy(()=> import('./pages/terminals'));
const Invoices = React.lazy(() => import('./pages/invoices'));
const Taxbills = React.lazy(()=> import('./pages/taxbill'));
const NumberPlates = React.lazy(()=> import('./pages/numberplates'));
const Duties = React.lazy(()=> import('./pages/duties'));
const ShippingLines = React.lazy(()=> import('./pages/shippinglines'));
const Markers = React.lazy(()=> import('./pages/markers'));
const ProfilePage = React.lazy(()=> import('./pages/profile'));



function App() {
   const { token,userId,login,logout } = useAuth();
  return (
   <AuthContext.Provider value={{
      isLoggedIn: !!token,
      userId:userId,
      token:token,
      login: login,
      logout: logout
    }}>
       
       <Router>
    <div className="App">
       
        <Suspense fallback={<div className="centr"><h3>Loading...</h3></div>}>
          <Switch>
            <Route path="/declare/shippings/:product" exact>
                  <ShippingLines />
               </Route>
            <Route path="/declare/duties/:product" exact>
                  <Duties />
               </Route>
            <Route path="/declare/numberplates/:product" exact>
                  <NumberPlates />
               </Route>
            <Route path="/declare/markers/:product" exact>
                  <Markers />
               </Route>
            <Route path="/declare/taxbills/:product" exact>
                  <Taxbills />
               </Route>
            <Route path="/declare/invoices/:product" exact>
                  <Invoices />
               </Route>
            <Route path="/declare/terminals/:product" exact>
                  <Terminals />
               </Route>
            <Route path="/declare/bills/:product" exact>
                  <BillList />
               </Route>
               
               <Route path="/profile" exact>
                  <ProfilePage />
               </Route>
               <Route path="/declare/:id" exact>
                  <Declaredetail />
               </Route>
               <Route path="/upload" exact>
                  <Upload />
               </Route>
               <Route path="/accounts" exact>
                  <Accounts />
               </Route>
               <Route path="/corporate" exact>
                  <Corporate />
               </Route>
               <Route path="/login" exact>
                  <Login />
               </Route>
               <Route path="/signup" exact>
                  <Signup />
               </Route>
               <Route path="/" exact>
                  <Home />
               </Route>
          </Switch>
       </Suspense> 
    </div>
     </Router> 
   </AuthContext.Provider>

  );
}

export default App;
