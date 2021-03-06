import '../../@polymer/polymer/polymer-legacy.js';
import '../../input-picker-pattern/overlay-picker-mixin.js';
import './date-picker.js';
import { PolymerElement } from '../../@polymer/polymer/polymer-element.js';
/**
 *   `<overlay-date-picker>` extends `date-picker` in an overlay.
 *
 *   ```html
 *   <overlay-date-picker value="{{value}}" ></overlay-date-picker>
 *   ```
 *
 *  A use case could be for example, if you want on mobile devices use the `native picker` and on desktop devices the polyfill.
 *
 *  ```html
 *    <overlay-date-picker native-on-mobile></overlay-date-picker>
 *  ```
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--calendar-element`               | Mixin applied to the calendar                  | {}
 * `--calendar-cell`                  | Mixin applied to the date cells                | {}
 * `--calendar-cell-hovered`          | Mixin applied to hovered date cells            | {}
 * `--calendar-cell-size`             | width of a date cell                           | 3em
 * `--calendar-cell-border-radius`    | border-radius of a date cell                   | 0.25em
 * `--calendar-cell-font-size`        | font-size of a date cell                       | 0.75em
 *
 *  Have a look at [input-picker-pattern#input-picker-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-picker-shared-style) and [input-picker-pattern#input-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-shared-style) to see how to style the element.
 *
 *  @customElement
 *  @polymer
 *
 *  @appliesMixin OverlayPickerMixin
 *  @appliesMixin DatePickerPattern
 *
 *  @demo demo/overlay-elements.html overlay demo
 *  @demo demo/music-album.html music album demo
 **/
class OverlayDatePicker extends OverlayPickerMixin(DatePickerPattern(PolymerElement)) { // eslint-disable-line no-undef

  static get is() {
    return 'overlay-date-picker';
  }

  get _hasNative() {
    return OverlayDatePicker._hasNative;
  }

}
window.customElements.define(OverlayDatePicker.is, OverlayDatePicker);
