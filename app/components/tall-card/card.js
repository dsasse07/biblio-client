import Component from '@glimmer/component';

export default class TallCardCardComponent extends Component {
  get publishedYear() {
    return this.args.book.publishedDate.substring(0, 4);
  }
}
