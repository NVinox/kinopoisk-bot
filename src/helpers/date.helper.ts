import { EMonthGenetive } from "../enums/month.enum";

export class DateHelper {
  private minutesInHour = 60;

  convertMinutesToString(movieMinutes: number): string {
    let result = "";
    const hours =
      movieMinutes < this.minutesInHour
        ? 0
        : Math.floor(movieMinutes / this.minutesInHour);
    const minutes =
      movieMinutes < this.minutesInHour
        ? movieMinutes
        : movieMinutes % this.minutesInHour;

    if (hours) result += `${hours}ч `;
    if (minutes) result += `${minutes}м `;

    return result;
  }

  static convertDateFromISO(date: string): string {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = EMonthGenetive[dateObject.getMonth()];
    const day = dateObject.getDate();

    return `${day} ${month} ${year}г`;
  }

  static getDeclensionAge(age: number): string {
    const smallRegExp = new RegExp(/(2|3|4)$/);
    const mediumRegExp = new RegExp(/(0|5|6|7|8|9)$/);

    if (age > 4 && age < 21) {
      return `${age} лет`;
    }

    if (smallRegExp.test(age.toString())) {
      return `${age} года`;
    }

    if (mediumRegExp.test(age.toString())) {
      return `${age} лет`;
    }

    return `${age} год`;
  }
}
