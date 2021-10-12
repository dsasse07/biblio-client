import Component from '@glimmer/component';

export default class BookCardDetailsComponent extends Component {
  get formattedAuthors() {
    return this.args.authors?.join(', ');
  }
}
