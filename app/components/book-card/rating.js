import Component from '@glimmer/component';

export default class TallCardRatingComponent extends Component {
  get earnedStars() {
    const earnedStars = this.args.rating ? Math.round(this.args.rating) : 0;
    return new Array(earnedStars).fill(0);
  }

  get unearnedStars() {
    const missingStarCount = 5 - this.earnedStars.length;
    return new Array(missingStarCount).fill(0);
  }

  get ratingsCount() {
    return this.args.count ?? 0;
  }
}
