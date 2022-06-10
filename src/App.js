import { Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import LandingPage from "./views/LandingPage";
import VisualizeQuestion from "./views/VisualizeQuestion";
import BarLeft from "./components/HomeComponents/BarLeft/BarLeft";
import PostFormMui from "./components/HomeComponents/FormWithMUI/PostFormMui";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
// import { UserProfile } from "./components/HomeComponents/UserProfile/UserProfile";
import Component404 from "./components/404/Component404";
import { useDispatch } from "react-redux";
import { createUser } from "./redux/actions/user";
import FavoritesUser from "./views/FavouritesUser"
import Spinner from "./components/spinner/Spinner";
import ProfileDashboard from "./components/HomeComponents/ProfileDashBoard/ProfileDashboard";
import { AllUsers } from "./components/HomeComponents/AllUsers/AllUsers";
import { AdminContainer } from "./views/AdminContainer";
import { AdminEditTags } from "./components/HomeComponents/Admin/AdminEditTags";
import { PaypalC } from "./components/Paypal/PaypalC";

function App() {
  const { isLoading, isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    const createUserFromDispatch = () => {
      if (isAuthenticated) {
        dispatch(createUser(user));
      }
    };
    createUserFromDispatch();
  }, [user, isAuthenticated, isLoading, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Switch>
      <Route exact path="/">
        {isAuthenticated ? <Redirect to="/questions" /> : <LandingPage />}
      </Route>

      {/* <Route exact path="/questions">
        {!isAuthenticated ? <Redirect to="/" /> : <Home />}
      </Route> */}

      <Route exact path="/questions">
        {!isAuthenticated ? <Redirect to="/" /> : <Home />}
      </Route>

      <Route exact={true} path="/visualize-question/:questionId">
        {!isAuthenticated ? (
          <Redirect to="/" />
        ) : (
          <BarLeft>
            <VisualizeQuestion />
          </BarLeft>
        )}
      </Route>

      <Route exact={true} path="/create-question">
        {!isAuthenticated ? (
          <Redirect to="/" />
        ) : (
          <BarLeft>
            <PostFormMui />
          </BarLeft>
        )}
      </Route>

      <Route exact={true} path="/user-profile">
        {!isAuthenticated ? (
          <Redirect to="/" />
        ) : (
          <BarLeft>
            <ProfileDashboard />
          </BarLeft>
        )}
      </Route>

      <Route exact={true} path="/all-users">
        {!isAuthenticated ? (
          <Redirect to="/" />
        ) : (
          <BarLeft>
            <AllUsers />
          </BarLeft>
        )}
      </Route>

      <Route exact={true} path="/donar">
        {!isAuthenticated ? (
          <Redirect to="/" />
        ) : (
          <BarLeft>
            <PaypalC />
          </BarLeft>
        )}
      </Route>

      <Route exact={true} path="/favourites-user">
        {!isAuthenticated
          ? (<Redirect to="/" />)
          : (
            <BarLeft>
              <FavoritesUser />
            </BarLeft>
          )
        }
      </Route>

      <Route exact={true} path="/admin">
        {!isAuthenticated
          ? (<Redirect to="/" />)
          : (
            <BarLeft>
              <AdminContainer />
            </BarLeft>
          )
        }
      </Route>

      <Route exact={true} patch='/admin/edit-tags'>
        {!isAuthenticated
          ? (<Redirect to="/" />)
          : (
            <BarLeft>
              <AdminContainer />
              <AdminEditTags />
            </BarLeft>
          )
        }
      </Route>

      <Route path="*" exact={true} component={Component404} />
    </Switch>
  );
}

export default App;
