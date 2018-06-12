import '../../@polymer/polymer/polymer-legacy.js';
import '../../input-picker-pattern/overlay-picker-mixin.js';
import './time-picker.js';
import { PolymerElement } from '../../@polymer/polymer/polymer-element.js';
/**
 *   `<overlay-time-picker>` extends `time-picker` in an overlay.
 *
 *   ```html
 *   <overlay-time-picker value="{{value}}"></overlay-time-picker>
 *   ```
 *
 *  A use case could be for example, if you want on mobile devices use the `native picker` and on desktop devices the polyfill.
 *
 *  ```html
 *    <overlay-time-picker native-on-mobile></overlay-time-picker>
 *  ```
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--time-element` | Mixin applied to the time-element | {}
 *
 *  Have a look at [input-picker-pattern#input-picker-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-picker-shared-style) and [input-picker-pattern#input-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-shared-style) to see how to style the element.
 *
 *  @customElement
 *  @polymer
 *
 *  @appliesMixin OverlayPickerMixin
 *  @appliesMixin TimePickerPattern
 *
 *  @demo demo/overlay-elements.html overlay demo
 *  @demo demo/music-album.html music album demo
 **/
class OverlayTimePicker extends OverlayPickerMixin(TimePickerPattern(PolymerElement)) { // eslint-disable-line no-undef

  static get is() {
    return 'overlay-time-picker';
  }

  get _hasNative() {
    return OverlayTimePicker._hasNative;
  }

}
window.customElements.define(OverlayTimePicker.is, OverlayTimePicker);
