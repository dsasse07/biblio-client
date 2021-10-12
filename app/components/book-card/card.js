import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TallCardCardComponent extends Component {
  @tracked isSaving = false;
  @tracked isComplete = false;

  get publishedYear() {
    return this.args.book.publishedDate.substring(0, 4);
  }

  @action
  addBook() {
    const book = this.args.book;
  }
}
