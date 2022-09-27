import { Route, Switch, Redirect } from "react-router-dom";
import React, {Suspense} from "react";

// import AllQuotes from "./pages/AllQuotes";
// import NewQuotes from "./pages/NewQuotes";
// import QuoteDetail from "./pages/QuoteDetail";
// import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuotes = React.lazy(() => import('./pages/NewQuotes'));
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));
const AllQuotes = React.lazy(() => import('./pages/AllQuotes'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Suspense fallback={<div className="centered"><LoadingSpinner></LoadingSpinner></div>}>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/new-quotes">
            <NewQuotes />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </Suspense>
  );
}

export default App;
