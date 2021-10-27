import RESTAdapter from '@ember-data/adapter/rest';
import ENV from 'biblio-client/config/environment';

export default class ApplicationAdapter extends RESTAdapter {
  namespace = 'rest-api';
  host = ENV.APP.BACKEND_URL;
}
