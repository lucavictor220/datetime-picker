import '../../@polymer/polymer/polymer-legacy.js';
import '../../datetime-input/datetime-input.js';
import './datetime-polyfill-picker-mixin.js';
import './time-element.js';
import './calendar-element.js';
import { PolymerElement } from '../../@polymer/polymer/polymer-element.js';
/**
 * Mixin for datetime-picker
 *
 *  @appliesMixin DatetimeMixin
 *  @appliesMixin FormElementMixin
 *  @appliesMixin CalendarElementPattern
 *  @appliesMixin TimeElementPattern
 *  @appliesMixin SwitchContainerMixin
 *  @appliesMixin SwitchContainerMixin
 *  @appliesMixin DatetimePolyfillPickerMixin
 *
 * @mixinFunction
 * @polymer
 *
 * @param {Object} superClass class to extend
 * @return {Object} extended class
 */
const DatetimePickerPattern = superClass => class extends DatetimePolyfillPickerMixin(DateInputPattern(TimeInputPattern(DatetimeInputMixin(CalendarElementPattern(TimeElementPattern(SwitchContainerMixin(DatetimeMixin(superClass)))))))) { // eslint-disable-line no-unused-vars, no-undef

  static get expectedNativeInputType() {
    return 'datetime-local';
  }

  static get pickerTemplate() {
    return `
      <div id="picker" class="dropdown" horizontal$="[[_ifClamped(clamp, 'day')]]">
        ${this.calendarTemplate}
        ${this.timeTemplate}
        <div id="buttons">
          ${this.buttonTemplate}
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      /**
       * Clamp datetime to a property
       * possible values: 'month', 'day', 'hour', 'minute', 'second', 'millisecond' or ''
       */
      clamp: {
        type: String,
        value: 'millisecond',
        notify: true
      }
    }
  }

  _onDblClickDay() {
    super._onDblClickDay();
    this.confirm();
  }

  renderCalendar(year, month, day) {
    if (this._hasNative && this.native) {
      return;
    }
    super.renderCalendar(year, month, day, this.confirmedDate);
  }

  open() {
    const oldValue = this.opened;
    if (super.open) {
      super.open();
    }
    this.renderCalendar(this.year, this.month, this.day);
    if (oldValue === false) {
      if (!(this.partsDisabled && this.partsDisabled.days) && !(this.partsHidden && this.partsHidden.days)) {
        this.$.days.focus();
      }
    }
  }

  _setConfirmedValues() {
    if (!this.date && this.currentSelectedDayNode) {
      this.date = this.currentSelectedDayNode.dataset.date;
      return;
    }
    this.setProperties({
      confirmedDatetime: this.datetime,
      confirmedDate: this.date,
      confirmedTime: this.time,
      confirmedValue: this.value
    })
  }
}
/**
 *  `<datetime-picker>` is a picker for date and time for **[Polymer](https://github.com/Polymer/polymer)** that can use the **native** input, too. If the **native** picker is choosen and is not supported, this element uses the **polyfill** datetime-picker. The `<calendar-element>` and the `<time-element>` will come in place if the native picker is not available or is not explicitly wanted. A range picker is provided by combining the `min`- and `max`-attributes.
 *
 *  ```html
 *    <datetime-picker value="{{value}}"></datetime-picker>
 *  ```
 *
 *  A use case could be for example, if you want on mobile devices use the `native picker` and on desktop devices this polyfill.
 *
 *  ```html
 *    <datetime-picker native-on-mobile></datetime-picker>
 *  ```
 *
 *  If you need an **overlay** then use `overlay-datetime-picker`, that creates the element in an `overlay-element`, that extends *IronOverlayBehavior* and will create some of its attribute-bindings.
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
 *  @appliesMixin DatetimePickerPattern
 *
 *  @demo demo/index.html
 *  @demo demo/datetime-elements.html datetime elements
 *  @demo demo/form.html in a form
 *  @demo demo/music-album.html music album demo
 **/
class DatetimePicker extends DatetimePickerPattern(PolymerElement) { // eslint-disable-line no-undef

  static get is() {
    return 'datetime-picker';
  }

  static get styleToInclude() {
    return `${super.styleToInclude || ''} dropdown-style`;
  }

  get _hasNative() {
    return DatetimePicker._hasNative;
  }
}

window.customElements.define(DatetimePicker.is, DatetimePicker);
