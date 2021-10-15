import EmberRouter from '@ember/routing/router';
import config from 'biblio-client/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('search-results');
  this.route('login');
});
