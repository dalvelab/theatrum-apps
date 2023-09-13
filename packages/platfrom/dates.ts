export const rusMonths = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь'
]

export const genetiveRusMonths = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
]

export const shortRusDayNames = [
  'вс',
  'пн',
  'вт',
  'ср',
  'чт',
  'пт',
  'сб',
];

export function getGenetiveRusMonth(month: number) {
  return genetiveRusMonths[month - 1];
}

export function getformatDateLocale(date: Date, timeZone: string = 'Asia/Yekaterinburg' ) {
  return new Date(date).toLocaleString('ru-RU', { timeZone }).split(',')[0];
}

export function getformatDateLocaleTime(date: Date, timeZone: string = 'Asia/Yekaterinburg' ) {
  return new Date(date).toLocaleString('ru-RU', { timeZone }).split(',')[1].trim().substring(0, 5)
}

type formatAfishaDaysType = {
  id :string;
  date: number;
  month: string;
  time: string | null;
}

export function formatAfishaDays(dates: Date[]): formatAfishaDaysType[] {
  const ids = new Set();

  const formatted: formatAfishaDaysType[] = [];

  for (let i = 0; i < dates.length; i++) {
    const dateString = getformatDateLocale(dates[i])
    const id = dateString.substring(0, 10);

    if (ids.has(id)) {
      const index = formatted.findIndex((date) => date.id === id);
      formatted[index] = {
        ...formatted[index],
        time: `${formatted[index].time} ${getformatDateLocaleTime(dates[i])}`,
      }
    } else {
      ids.add(id);
      formatted.push({
          id,
          date: Number(dateString.substring(0, 2)),
          month: getGenetiveRusMonth(Number(dateString.substring(3, 5))),
          time: getformatDateLocaleTime(dates[i])
      })
    }
  }

  return formatted
}