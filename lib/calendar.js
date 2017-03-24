function Calendar(options) {
  let self = this;
  let opts = {
    weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    firstDayOfWeek: 0,
    daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    // code for previous/next icons. this is where you put your custom icon code e.g. fontawesome
    prevArrow: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 17 17"><g></g><path d="M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z" /></svg>',
    nextArrow: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 17 17"><g></g><path d="M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z" /></svg>'
  };
  options = Object.assign(opts, options || {});

  const now = new Date();
  let currentYear = now.getFullYear();
  let currentMonth = now.getMonth();

  let utils = {
    getDaysinMonth(month, yr) {
      month = typeof month === 'undefined' ? currentMonth : month;

      yr = typeof yr === 'undefined' ? currentYear : yr;

      if (month === 1 && (((yr % 4 === 0) && (yr % 100 !== 0)) || (yr % 400 === 0))) return 29;

      return options.daysInMonth[month];
    },
    yearToStr(year) {
      return year + '年';
    },
    monthToStr(monthNumber) {
      return options.months[monthNumber];
    },
    /**
     * 对日期进行格式化
     * @param date 要格式化的日期
     * @param format 进行格式化的模式字符串
     *     支持的模式字母有：
     *     y:年,
     *     M:年中的月份(1-12),
     *     d:月份中的天(1-31),
     *     h:小时(0-23),
     *     m:分(0-59),
     *     s:秒(0-59),
     *     S:毫秒(0-999),
     *     q:季度(1-4)
     * @return String
     */
    dateFmt: function(date, format) {
      if (typeof date === 'number') {
        date = new Date(date);
      }
      if (format === undefined) {
        format = date;
        date = new Date();
      }
      let map = {
        'M': date.getMonth() + 1,                   // 月份
        'd': date.getDate(),                        // 日
        'h': date.getHours(),                       // 小时
        'm': date.getMinutes(),                     // 分
        's': date.getSeconds(),                     // 秒
        'q': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds()                 // 毫秒
      };
      format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
        let v = map[t];
        if (v !== undefined) {
          if (all.length > 1) {
            v = '0' + v;
            v = v.substr(v.length - 2);
          }
          return v;
        } else if (t === 'y') {
          return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
      });
      return format;
    }
  };

  const calendarContainer = options.wrapper;
  const fragment = window.document.createDocumentFragment();
  fragment.appendChild(buildMonthNav());

  const bodyContainer = createElement('div', 'fiui-bodyContainer');
  bodyContainer.appendChild(buildWeekdays());
  const daysContainer = createElement('div', 'fiui-days');
  bodyContainer.appendChild(daysContainer);
  daysContainer.appendChild(buildDays());
  fragment.appendChild(bodyContainer);
  calendarContainer.appendChild(fragment);

  self.prevMonthNav.addEventListener('click', () => changeMonth(-1));
  self.nextMonthNav.addEventListener('click', () => changeMonth(1));
  self.prevYearNav.addEventListener('click', () => changeMonth(-12));
  self.nextYearNav.addEventListener('click', () => changeMonth(12));
  daysContainer.addEventListener('click', selectDate);

  function buildMonthNav() {
    const headContainer = createElement('div', 'fiui-headContainer');
    const navigationCurrentMonth = createElement('div', 'fiui-current-month');
    const navigationCurrentYear = createElement('div', 'fiui-current-year');

    self.currentMonthElement = createElement('span', 'cur-month', utils.monthToStr(currentMonth));
    self.prevMonthNav = createElement('span', 'fiui-prev-month');
    self.prevMonthNav.innerHTML = options.prevArrow;
    self.nextMonthNav = createElement('span', 'fiui-next-month');
    self.nextMonthNav.innerHTML = options.nextArrow;

    self.currentYearElement = createElement('span', 'cur-year', utils.yearToStr(currentYear));
    self.prevYearNav = createElement('span', 'fiui-prev-year');
    self.prevYearNav.innerHTML = options.prevArrow;
    self.nextYearNav = createElement('span', 'fiui-next-year');
    self.nextYearNav.innerHTML = options.nextArrow;

    navigationCurrentMonth.appendChild(self.prevMonthNav);
    navigationCurrentMonth.appendChild(self.currentMonthElement);
    navigationCurrentMonth.appendChild(self.nextMonthNav);

    navigationCurrentYear.appendChild(self.prevYearNav);
    navigationCurrentYear.appendChild(self.currentYearElement);
    navigationCurrentYear.appendChild(self.nextYearNav);
    
    headContainer.appendChild(navigationCurrentMonth);
    headContainer.appendChild(navigationCurrentYear);

    return headContainer;
  }

  function buildWeekdays() {
    const weekdayContainer = createElement('div', 'fiui-weekdays');
    const firstDayOfWeek = options.firstDayOfWeek;
    let weekdays = options.weekdays;

    if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
      weekdays = [].concat(
        weekdays.splice(firstDayOfWeek, weekdays.length),
        weekdays.splice(0, firstDayOfWeek)
      );
    }

    weekdayContainer.innerHTML = `<span class=fiui-weekday>${weekdays.join('</span><span class=fiui-weekday>')}</span>`;

    return weekdayContainer;
  }

  function buildDays() {
    const firstOfMonth = (
        new Date(currentYear, currentMonth, 1).getDay() -
        options.firstDayOfWeek + 7
      ) % 7;

    const prevMonthDays = utils.getDaysinMonth((currentMonth - 1 + 12) % 12);

    const daysInMonth = utils.getDaysinMonth();
    const days = window.document.createDocumentFragment();

    let dayNumber = prevMonthDays + 1 - firstOfMonth;

    // prepend days from the ending of previous month
    for (let i = 0; dayNumber <= prevMonthDays; i++, dayNumber++) {
      days.appendChild(
        createDay(' prevMonthDay', new Date(currentYear, currentMonth - 1, dayNumber), dayNumber)
      );
    }

    // Start at 1 since there is no 0th day
    for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++) {
      days.appendChild(
        createDay('', new Date(currentYear, currentMonth, dayNumber), dayNumber)
      );
    }

    // append days from the next month
    for (let dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth; dayNum++) {
      days.appendChild(
        createDay(' nextMonthDay', new Date(currentYear, currentMonth + 1, dayNum % daysInMonth), dayNum)
      );
    }

    return days;
  }

  function createDay(className, date) {
    const dayElement = createElement('span', 'fiui-day' + className, date.getDate());

    dayElement.dateObj = date;

    toggleClass(dayElement, 'today', compareDates(date, now) === 0);
    if (compareDates(date, self.selectedDate) === 0) {
      dayElement.classList.add('selected');
      self.selectedDateElem = dayElement;
    }

    dayElement.tabIndex = 0;

    return dayElement;
  }

  function changeMonth(value, is_offset) {
    is_offset = typeof is_offset === 'undefined' || is_offset;
    const delta = is_offset ? value : value - self.currentMonth;

    currentMonth += delta;

    if (currentMonth < 0 || currentMonth > 11) {
      currentYear += (currentMonth > 11 ? 1 : -1);
      currentMonth = (currentMonth + 12) % 12;
    }

    updateCalendar();
  }

  function updateCalendar() {
    self.currentYearElement.textContent = utils.yearToStr(currentYear);
    self.currentMonthElement.textContent = utils.monthToStr(currentMonth);
    daysContainer.textContent = '';
    daysContainer.appendChild(buildDays());
  }

  function selectDate(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!e.target.classList.contains('fiui-day')) return;
    self.selectedDate = new Date(e.target.dateObj.getTime());

    if (self.selectedDate.getMonth() !== currentMonth) {
      currentYear = self.selectedDate.getFullYear();
      currentMonth = self.selectedDate.getMonth();

      updateCalendar();
    } else {
      self.selectedDateElem = e.target;
      if (daysContainer.querySelector('span.selected')) {
        daysContainer.querySelector('span.selected').classList.remove('selected');
      }
      e.target.classList.add('selected');
    }

    options.onSelected(utils.dateFmt(self.selectedDate, options.dateFormat || 'yyyy-MM-dd'));
  }

  function createElement(tag, className, content) {
    const e = window.document.createElement(tag);
    className = className || '';
    content = content || '';

    e.className = className;

    if (content) {
      e.textContent = content;
    }

    return e;
  }

  function toggleClass(elem, className, bool) {
    elem.classList[bool ? 'add' : 'remove'](className);
  }

  function compareDates(date1, date2, timeless) {
    if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
      return false;
    }

    if (timeless !== false) {
      return new Date(date1.getTime()).setHours(0, 0, 0, 0) - new Date(date2.getTime()).setHours(0, 0, 0, 0);
    }

    return date1.getTime() - date2.getTime();
  }

  self.toggle = function(bool) {
    toggleClass(calendarContainer, 'open', bool);
  };

  return self;
}

export default Calendar;
