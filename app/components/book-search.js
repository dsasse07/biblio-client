import Component from '@glimmer/component';
// import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class BookSearchComponent extends Component {
  @service search;

  @action
  async submitSearch(e) {
    e.preventDefault();
    await this.search.submitSearch();
  }
}
