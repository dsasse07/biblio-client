import Component from '@glimmer/component';

export default class StatefulButtonLabelComponent extends Component {
  get loadingText() {
    return this.args.loadingText ? this.args.loadingText : 'Loading';
  }

  get completeText() {
    return this.args.completeText ? this.args.completeText : 'Complete!';
  }
}
