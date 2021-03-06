import '../../@polymer/polymer/polymer-legacy.js';
import '../../input-picker-pattern/overlay-picker-mixin.js';
import './datetime-picker.js';
import { PolymerElement } from '../../@polymer/polymer/polymer-element.js';
/**
 *   `<overlay-datetime-picker>` extends `datetime-picker` and behaves simular.
 *
 *   ```html
 *   <overlay-datetime-picker value="{{value}}" ></overlay-datetime-picker>
 *   ```
 *
 *  A use case could be for example, if you want on mobile devices use the `native picker` and on desktop devices the polyfill.
 *
 *  ```html
 *    <overlay-datetime-picker native-on-mobile></overlay-datetime-picker>
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
 * `--time-element`                   | Mixin applied to the time-element              | {}
 *
 *  Have a look at [input-picker-pattern#input-picker-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-picker-shared-style) and [input-picker-pattern#input-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-shared-style) to see how to style the element.
 *
 *  @customElement
 *  @polymer
 *
 *  @appliesMixin OverlayPickerMixin
 *  @appliesMixin DatetimePickerPattern
 *
 *  @demo demo/overlay-elements.html overlay demo
 *  @demo demo/music-album.html music album demo
 **/
class OverlayDatetimePicker extends OverlayPickerMixin(DatetimePickerPattern(PolymerElement)) { // eslint-disable-line no-undef

  static get is() {
    return 'overlay-datetime-picker';
  }

  get _hasNative() {
    return OverlayDatetimePicker._hasNative;
  }

}
window.customElements.define(OverlayDatetimePicker.is, OverlayDatetimePicker);
