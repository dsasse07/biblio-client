import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class BookSearchComponent extends Component {
  @service search;
  @tracked isLoading = false;

  @action
  async submitSearch(e) {
    e.preventDefault();
    if (this.isLoading) return;
    await this.search.submitSearch();
    this.isLoading = false;
  }
}
