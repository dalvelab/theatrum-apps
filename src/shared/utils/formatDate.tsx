export const rusMonths = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентрябрь',
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
  'сентрября',
  'октября',
  'ноября',
  'декабря'
]

export function getGenetiveRusMonth(month: number) {
  return genetiveRusMonths[month - 1];
}

export function formatAfishaDays(dates: Date[]) {
  return dates.map((date, index) => {
    const dateString = date.toString()

    if (index === dates.length - 1) {
      return `${Number(dateString.substring(8, 10))} ${getGenetiveRusMonth(Number(dateString.substring(5, 7)))}`
    }

    return dateString.substring(8, 10);
  })
}