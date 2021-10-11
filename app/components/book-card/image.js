import Component from '@glimmer/component';

export default class BookCardImageComponent extends Component {
  get bookImage() {
    return this.args.image
      ? this.args.image
      : 'assets/images/bookPlaceholder.png';
  }
}
