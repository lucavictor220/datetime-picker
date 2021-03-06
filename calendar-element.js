import '../../@polymer/polymer/polymer-legacy.js';
import '../../property-mixins/datetime-mixin.js';
import '../../input-picker-pattern/form-element-mixin.js';
import '../../input-picker-pattern/input-shared-style.js';
import '../../input-picker-pattern/input-picker-shared-style.js';
import '../../input-picker-pattern/switch-container-mixin.js';
import '../../number-input/integer-input.js';
import { PolymerElement } from '../../@polymer/polymer/polymer-element.js';
/**
 * Mixin for calendar-element
 *
 * @mixinFunction
 * @polymer
 *
 * @param {Object} superClass class to extend
 * @return {Object} extended class
 */
const CalendarElementPattern = superClass => class extends superClass { // eslint-disable-line no-unused-vars, no-undef

  static get styleToInclude() {
    return `input-picker-shared-style input-shared-style`;
  }

  /**
   * custom style content
   * @type {string}
   */
  static get styleTemplate() {
    return `
      ${super.styleTemplate || ''}
      #calendar {
        color: var(--input-picker-color);
        background-color: var(--input-picker-background);
        border-radius: var(--input-picker-border-radius);
        padding: var(--input-picker-padding);
        @apply --input-picker;
        display: -ms-inline-flexbox;
        display: -webkit-inline-flex;
        display: inline-flex;
        flex-flow: column nowrap;
        @apply --calendar-element;
      }
      #calendar #top {
        display: inline-flex;
        flex-flow: row nowrap;
        align-items: stretch;
        align-self: stretch;
      }
      #calendar #monthSelector {
        flex: 1 0 auto;
        --inner-input-color: var(--input-picker-color, inherit);
        --inner-input-border-style: solid;
        --inner-input-focus-border-style: solid;
      }
      #monthSelector option {
        color: var(--inner-input-focus-color, currentColor);
        background: var(--inner-input-focus-background, rgba(0,0,0,0.1));
        text-align: center;
      }
      #calendar #yearInput {
        font-weight: bold;
        flex: 0 0 auto;
        --input-color: var(--inner-input-color, var(--input-picker-color, inherit));
        --input-border-style: solid;
        --input-focus-border-style: solid;
      }
      #calendar #days {
        position: relative;
      }
      #calendar #caption {
        display: inline-flex;
        flex-flow: row nowrap;
      }
      #calendar #days:focus {
        outline: none;
      }
      #calendar .day {
        @apply --calendar-cell;
        -webkit-background-clip: padding-box;
        color: inherit;
        background-clip: padding-box;
        line-height: normal;
        float: left;
        position: relative;
        font-size: var(--calendar-cell-font-size, 0.75em);
        border-radius: var(--calendar-cell-border-radius, 0.3em);
        width: var(--calendar-cell-size, 3em);
        height: var(--calendar-cell-size, 3em);
        min-width: 2em;
        min-height: 2em;
        box-sizing: content-box;
        transition-property: background;
        transition-duration: 250ms;
        transition-timing-function: cubic-bezier(0.5, 1, 0.5, 1);
      }
      #calendar .day:nth-child(7n+1) {
        clear: left;
      }
      #calendar:hover #days:not([disabled]) .day.selected,
      #calendar #days:not([disabled]):focus .day.selected {
        background-color: var(--inner-input-focus-background);
        color: var(--inner-input-focus-color);
      }
      #calendar .day:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        will-change: opacity, border-color;
        opacity: 0;
        border-radius: inherit;
        border: thin solid transparent;
        transition-property: opacity;
        transition-duration: var(--input-transition-duration, 250ms);
        transition-timing-function: cubic-bezier(0.6, 1, 0.2, 1);
      }
      #calendar .day:after {
        content: attr(day);
        color: currentColor;
        position: absolute;
        white-space: nowrap;
        border-radius: inherit;
        opacity: 1;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
      }
      #calendar #dates .day {
        cursor: pointer;
      }
      #calendar #dates .day:hover {
        will-change: background;
        @apply --calendar-cell-hovered;
      }
      #calendar #dates .day:hover:before,
      #calendar #days .day.current:before {
        border-color: currentColor;
      }
      #calendar #dates .day.selected:before,
      #calendar #dates .day.recent:before {
        border-color: var(--inner-input-focus-background);
      }
      #calendar #days .day.recent:before,
      #calendar #days .day.current:before {
        opacity: 0.75;
      }
      #calendar #dates .day:hover:before {
        opacity: 0.5;
      }
      #calendar #days .day.selected:before {
        opacity: 0.9;
      }
      #calendar #dates .day.notinmonth:after {
        opacity: 0.6;
      }
      #calendar #dates .day.outofrange {
        pointer-events: none !important;
      }
      #calendar #dates .day.outofrange:after {
        font-style: var(--input-disabled-font-style, oblique);
        @apply --input-disabled;
      }
      #calendar #dates .day.outofrange:before {
        opacity: 0.25;
      }
      #calendar #dates .day.outofrange {
        opacity: 0.5;
      }
    `;
  }

  static get calendarTemplate() {
    return `
      ${super.contentTemplate || ''}
      <div id="calendar">
        <div id="top" hidden$="[[_computeMultibleClampExclusive(clamp, 'month', partsHidden.month, 'year', partsHidden.year)]]" >
          <button class="icon switch" prop$="[[_computeIncremPropTop(partsDisabled.month, clamp)]]" step="-1" style="order:0" disabled$="[[partsDisabled.year]]">${this._iconStepLeftTemplate}</button>
          <select id="monthSelector" hidden$="[[_ifClamped(clamp, 'month', partsHidden.month)]]" style="order:[[dateOrder.month]];" disabled$="[[partsDisabled.month]]" value="{{month::change}}">
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
            <option value="4"></option>
            <option value="5"></option>
            <option value="6"></option>
            <option value="7"></option>
            <option value="8"></option>
            <option value="9"></option>
            <option value="10"></option>
            <option value="11"></option>
            <option value="12"></option>
          </select>
          <integer-input id="yearInput" hidden$="[[_ifClamped(clamp, 'year', partsHidden.year)]]" style="order:[[dateOrder.year]];" pad-length="4" disabled="[[partsDisabled.year]]" start-at="[[_getDefaultForProp('year')]]" placeholder="[[_getDefaultForProp('year')]]" value-as-number="{{year}}"></integer-input>
          <button class="icon switch" prop$="[[_computeIncremPropTop(partsDisabled.month, clamp)]]" step="1" style="order:6" disabled$="[[partsDisabled.year]]">${this._iconStepRightTemplate}</button>
        </div>

        <div id="days" hidden$="[[_ifClamped(clamp, 'day', partsHidden.day)]]" disabled$="[[partsDisabled.day]]" tabindex="0" autofocus on-keydown="_checkKeycodeForDates">
          <div id="caption">
            <div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div>
          </div>
          <div id="dates" on-mousedown="_onClickDay" on-touchstart="_onClickDay" on-mousemove="_onMouseMoveDay">
            <div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div>
            <div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div>
            <div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div>
            <div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div>
            <div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div>
            <div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div><div class="day"></div>
          </div>
        </div>
      </div>
    `
  }

  static get properties() {
    return {
      /**
       * Clamp datetime to a property
       * possible values: 'month', 'day', 'hour'
       */
      clamp: {
        type: String,
        value: 'hour',
        notify: true
      },

      /**
       * Current hovered day node
       * to access: bind the attribute ('current-hovered-day') and get its '.dataset.date'- property represents the DateString
       */
      currentSelectedDayNode: {
        type: Node,
        notify: true
      },

      /**
       * Node of the last selected day (warning: if view changes )
       * to access: bind the attribute ('current-hovered-day') and get its '.dataset.date'- property represents the DateString
       */
      currentHoveredDayNode: {
        type: Node,
        notify: true
      },

      /**
       * date-parts that are hidden, affected by the `clamp`-attribute too
       * e.g. { year: true } would hide the input for year
       */
      partsHidden: {
        type: Object,
        value: function() {
          return {}
        },
        notify: true
      },

      _regexpDate: {
        type: RegExp,
        value: /(-?\d+)-(\d\d)-(\d\d)/
      }
    }
  }

  _computeMultibleClampExclusive(clamp, prop1, hidden1, prop2, hidden2) {
    return this._ifClamped(clamp, prop1, hidden1) && this._ifClamped(clamp, prop2, hidden2);
  }

  _setDate(d) {
    super._setDate(d);
    this.renderCalendar(this.year, this.month, this.day);
  }

  _onMouseMoveDay(e) {
    if (e) {
      const paths = e.path || [e.target];
      for (let i = 0; i < paths.length; i++) {
        if (paths[i].dataset && paths[i].dataset.date) {
          if (this.currentHoveredDayNode) {
            this.currentHoveredDayNode.classList.remove('hovered');
          }
          paths[i].classList.add('hovered');
          this.currentHoveredDayNode = paths[i];
          break;
        }
      }
    }
  }

  _onClickDay(e) {
    if (this._dayClicked === true) {
      this._onDblClickDay();
      this._dayClicked = false;
      return;
    }
    this._onMouseMoveDay(e);
    if (this.currentHoveredDayNode && this.currentHoveredDayNode.dataset.date) {
      this.currentSelectedDayNode = this.currentHoveredDayNode;
      const match = this._regexpDate.exec(this.currentSelectedDayNode.dataset.date);
      if (!match) {
        this._dayClicked = false;
        return;
      }
      if (this.timezone === undefined) {
        this._checkDefaultTimezone(new Date(+match[1], +match[2], +match[3]));
      }
      setTimeout(() => {
        this.setProperties({
          year: +match[1],
          month: +match[2],
          day: +match[3]
        })
      }, 0);
      this._dayClicked = true;
      setTimeout(() => {
        this._dayClicked = false;
      }, 250);
    }
  }

  _onDblClickDay() {
    this.renderCalendar(this.year, this.month, this.day);
  }

  _computeIncremPropTop(hideMonth) {
    if (hideMonth === true) {
      return 'year';
    }
    return 'month';
  }

  _localeChanged(locale) {
    if (!locale) {
      this.locale = window.navigator.language;
      return;
    }
    super._localeChanged(locale);

    for (let i = 0; i < 12; i++) {
      this.$.monthSelector.options[i].text = (new Date(1970, i, 15)).toLocaleDateString(locale, {
        month: 'long'
      });
    }

    // set weekday titles
    for (let i = 0; i < 7; i++) {
      let d = new Date(Date.UTC(1970, 0, 15 + i));
      let weekday = (d.getUTCDay() - 1 + 7) % 7;
      if (this.$.caption.children[weekday]) {
        this.$.caption.children[weekday].setAttribute('day', d.toLocaleDateString(locale, {
          timeZone: 'UTC',
          weekday: 'short'
        }));
      }
    }
  }

  /**
   * renderCalendars the current view (manually).
   * @param {number} year The year of the date of the current view.
   * @param {number} month The month of the date of the current view.
   * @param {number} day The day of the date of the current view.
   * @param {number} date The current selected date.
   */
  renderCalendar(year, month, day, date) { // eslint-disable-line
    // working in UTC-timezone
    const currentDate = this._clampDay(new Date()),
      selectedDate = (year === undefined || month === undefined || day === undefined) ? this._min || currentDate : this._clampDay(new Date(year, +month - 1, day));
    let recentDate;
    if (date || this.date) {
      const match = this._regexpDate.exec(date || this.date);
      if (match) {
        recentDate = new Date(+match[1], +match[2] - 1, +match[3]);
      }
    }
    if (isNaN(recentDate)) {
      recentDate = selectedDate;
    }
    year = year || selectedDate.getFullYear();
    const monthCounter = month === undefined ? selectedDate.getMonth() : (month - 1);
    const firstDateOfMonth = new Date(year, monthCounter, 0);

    const currentDay = this._dayDiff(currentDate, firstDateOfMonth),
      selectedDay = this._dayDiff(selectedDate, firstDateOfMonth),
      recentDay = this._dayDiff(recentDate, firstDateOfMonth);

    let min, max;
    if (this._min) {
      min = this._dayDiff(new Date(this._min.getFullYear(), this._min.getMonth(), this._min.getDate()), firstDateOfMonth);
    }
    if (this._max) {
      max = this._dayDiff(new Date(this._max.getFullYear(), this._max.getMonth(), this._max.getDate()), firstDateOfMonth);
    }

    const prevmonthlength = +new Date(year, monthCounter, 0).getDate();
    const thismonthlength = +new Date(year, monthCounter + 1, 0).getDate();
    const firstWeekDay = +new Date(year, monthCounter, 1).getDay() - 1; // Monday is first day
    let selectedDayInView;

    let counter = -(firstWeekDay + 7) % 7 + 1;

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        // Day Numbers
        if (counter <= 0) {
          this.$.dates.children[7*i + j].classList.add('notinmonth');
          this.$.dates.children[7*i + j].setAttribute('day', prevmonthlength + counter);
        } else if (counter > thismonthlength) {
          this.$.dates.children[7*i + j].classList.add('notinmonth');
          this.$.dates.children[7*i + j].setAttribute('day', counter - thismonthlength);
        } else {
          this.$.dates.children[7*i + j].classList.remove('notinmonth');
          this.$.dates.children[7*i + j].setAttribute('day', counter);
        }

        // Day is Current Day
        if (counter === currentDay) {
          this.$.dates.children[7*i + j].classList.add('current');
        } else {
          this.$.dates.children[7*i + j].classList.remove('current')
        }

        // Day is Recent Selected Day
        if (counter === recentDay) {
          this.$.dates.children[7*i + j].classList.add('recent');
        } else {
          this.$.dates.children[7*i + j].classList.remove('recent');
        }

        // Day is Selected Day
        if (counter === selectedDay) {
          this.$.dates.children[7*i + j].classList.add('selected');
          this.currentSelectedDayNode = this.$.dates.children[7*i + j];
          selectedDayInView = true;
        } else {
          this.$.dates.children[7*i + j].classList.remove('selected');
        }

        // Day is Min
        if (counter === min) {
          this.$.dates.children[7*i + j].classList.add('min');
        } else  {
          this.$.dates.children[7*i + j].classList.remove('min');
        }

        // Day is Max
        if (counter === max) {
          this.$.dates.children[7*i + j].classList.add('max');
        } else  {
          this.$.dates.children[7*i + j].classList.remove('max');
        }

        // Day is out of range
        if (counter < min || counter > max) {
          this.$.dates.children[7*i + j].classList.add('outofrange');
        } else {
          this.$.dates.children[7*i + j].classList.remove('outofrange');
        }

        this.$.dates.children[7*i + j].dataset.date = this._toUTCDate(Date.UTC(year, monthCounter, counter));
        counter++;
      }
    }

    if (!selectedDayInView) {
      this.currentSelectedDayNode = null;
    }
    // fix for initial view
    this.$.monthSelector.selectedIndex = monthCounter;
  }

  _clampDay(d) {
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
  }

  _dayDiff(end, start) {
    return Math.round((end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * 6E4) / 865E5);
  }

  _minChanged(min) {
    super._minChanged(min);
    this.renderCalendar(this.year, this.month, this.day);
  }

  _maxChanged(max) {
    super._maxChanged(max);
    this.renderCalendar(this.year, this.month, this.day);
  }

  /**
   * key press event handler on dates area
   * @param  {[type]} e Event
   */
  _checkKeycodeForDates(e) {
    if (e && e.keyCode) {
      switch (e.keyCode) {
        case 37: // left
          if (this.day === undefined) {
            if (this.currentSelectedDayNode) {
              const match = this._regexpDate.exec(this.currentSelectedDayNode.dataset.date);
              if (match) {
                if (this.timezone === undefined) {
                  this._checkDefaultTimezone(new Date(+match[1], +match[2], +match[3]));
                }
                this.setProperties({
                  year: +match[1],
                  month: +match[2],
                  day: +match[3]
                })
              }
            }
          }
          this._incremProp('day', -1* ((this.partsStep && this.partsStep.day) || 1));
          e.preventDefault();
          e.stopPropagation();
          return;
        case 39: // right
          if (this.day === undefined) {
            if (this.currentSelectedDayNode) {
              const match = this._regexpDate.exec(this.currentSelectedDayNode.dataset.date);
              if (match) {
                if (this.timezone === undefined) {
                  this._checkDefaultTimezone(new Date(+match[1], +match[2], +match[3]));
                }
                this.setProperties({
                  year: +match[1],
                  month: +match[2],
                  day: +match[3]
                })
              }
            }
          }
          this._incremProp('day', ((this.partsStep && this.partsStep.day) || 1));
          e.preventDefault();
          e.stopPropagation();
          return;
        case 38: // up
          this._incremProp('month', 1);
          e.preventDefault();
          e.stopPropagation();
          return;
        case 40: // down
          this._incremProp('month', -1);
          e.preventDefault();
          e.stopPropagation();
          return;
        case 13: // enter
          if (this.currentSelectedDayNode) {
            const match = this._regexpDate.exec(this.currentSelectedDayNode.dataset.date);
            if (match) {
              if (this.timezone === undefined) {
                this._checkDefaultTimezone(new Date(+match[1], +match[2], +match[3]));
              }
              this.setProperties({
                year: +match[1],
                month: +match[2],
                day: +match[3]
              })
            }
          }
      }
    }
  }

  _getDefaultForProp(prop) {
    const d = (this.default && this._fromDatetime(this.default)) || new Date();
    switch (prop) {
      case 'year':
        return d.getFullYear();
      case 'month':
        return d.getMonth() + 1;
      case 'day':
        return d.getDate();
      default:
        return 0;
    }
  }
}
/**
* `<calendar-element>` adds a calendar to your page using Polymer.
*
* If you like to connect it to an input, try it like:
*
*   ```html
*     <input type="date" value="{{date::input}}">
*
*     <calendar-element date="{{date}}"></calendar-element>
*   ```
*
* For example if you clamp on `hour`, you can round `datetime` and `value` to `00:00:00`. If you set `clamp="day"` you hide the day-selection.
*
* The following custom properties and mixins are also available for styling:
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
* @customElement
* @polymer
*
* @appliesMixin CalendarElementPattern
* @appliesMixin SwitchContainerMixin
* @appliesMixin FormElementMixin
* @appliesMixin DatetimeMixin
*
* @demo demo/date-elements.html date elements
**/
class CalendarElement extends CalendarElementPattern(SwitchContainerMixin(FormElementMixin(DatetimeMixin(PolymerElement)))) { // eslint-disable-line no-undef

  static get is() {
    return 'calendar-element';
  }

  static get template() {
    return `
      <style include="${this.styleToInclude || ''}">
        ${this.styleTemplate}
      </style>
      ${this.calendarTemplate}
    `
  }

  connectedCallback() {
    super.connectedCallback();
    this.renderCalendar(this.year, this.month, this.day, this.date);
  }
}
window.customElements.define(CalendarElement.is, CalendarElement);
