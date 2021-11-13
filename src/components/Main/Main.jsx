import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import MyArticles from '../MyArticles';
import ListArticle from '../ListArticle';
import Article from '../Article';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import Profile from '../Profile';
import NewArticle from '../NewArticle';
import EditArticle from '../EditArticle';

import classes from './Main.module.scss';

const Main = () => (
  <main className={classes.main}>
    <Switch>
      <Route path="/my-articles" exact component={MyArticles} />
      <Route path="/articles/" exact component={ListArticle} />
      <Route
        exact
        path="/articles/:slug"
        render={({ match }) => {
          const { slug } = match.params;
          return <Article slug={slug} />;
        }}
      />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/profile" component={Profile} />
      <Route path="/new-article" component={NewArticle} />
      <Route path="/articles/:slug/edit" component={EditArticle} />
      <Redirect to="/articles" />
    </Switch>
  </main>
);

export default Main;
