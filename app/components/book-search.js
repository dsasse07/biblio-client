import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import ENV from 'biblio-client/config/environment';

const BOOKS_URL_BASE = 'https://www.googleapis.com/books/v1/volumes?q=';

export default class BookSearchComponent extends Component {
  @tracked searchQuery = '';
  @tracked results = null;

  get token() {
    const token = ENV.APP.GOOGLE_API_KEY;
    if (typeof token === 'string') {
      return encodeURIComponent(token);
    }
    return null;
  }

  _getValidQuery() {
    const query = this.searchQuery.trim();
    if (!query.length) return;
    return encodeURIComponent(query);
  }

  async _handleResponse(searchResults) {
    this.isLoading = false;
    this.results = searchResults;
    console.log(searchResults);
  }

  _handleError(err) {
    this.isLoading = false;
    console.log('err:', err);
  }

  _handleCleanup() {
    this.searchQuery = '';
  }

  @action
  submitSearch(e) {
    e.preventDefault();
    const query = this._getValidQuery();
    if (!query) return;

    this.isLoading = true;
    console.log('qeury', `${BOOKS_URL_BASE}${query}&key=${this.token}`);
    fetch(`${BOOKS_URL_BASE}${query}&key=${this.token}`)
      .then((res) => res.json())
      .then((data) => this._handleResponse(data))
      .catch((err) => {
        this._handleError(err);
      })
      .finally(() => {
        this._handleCleanup();
      });
  }
}
