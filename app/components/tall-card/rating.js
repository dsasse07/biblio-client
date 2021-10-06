import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class TallCardRatingComponent extends Component {
  @tracked earnedStars = [];
  @tracked unearnedStars = [1, 2, 3, 4, 5];

  get earnedStars() {
    return new Array(this.args.averageRating).fill(0);
  }

  get unearnedStars() {
    return new Array(5 - this.args.averageRating).fill(0);
  }
}
