import { DateHelper } from "../helpers/date.helper"
import { StringHelper } from "../helpers/string.helper"
import { PaginationHelper } from "../helpers/pagination.helper"
import { IPersonSearchDoc } from "../interfaces/person.interface"
import { PHOTO_TEMPLATE } from "../constants/images.constants"

export class PersonService {
  constructor(
    private readonly person: IPersonSearchDoc,
    private readonly currentPage: number,
    private readonly totalPages: number
  ) {}

  getPhotoCaption(): string {
    return StringHelper.insertStringDelimeter(
      "\n\n",
      this.getName(),
      this.getBirth(),
      this.getDeath(),
      this.getProferrions(),
      PaginationHelper.getProgress(this.currentPage, this.totalPages)
    )
  }

  getPhoto(): string {
    if (this.person.photo) {
      return this.person.photo
    }
    return PHOTO_TEMPLATE
  }

  private getName(): string {
    let name = ""

    if (this.person.name) {
      name = this.person.name
    }

    if (this.person.enName) {
      name += ` (${this.person.enName})`
    }

    return name
  }

  private getBirth(): string {
    let birth = ""

    if (this.person.birthday) {
      birth = `Дата рождения: ${DateHelper.convertDateFromISO(
        this.person.birthday
      )}`
    }

    if (this.person.birthday && this.person.age && !this.person.death) {
      birth += ` (${DateHelper.getDeclensionAge(this.person.age)})`
    }

    return birth
  }

  private getDeath(): string {
    let death = ""

    if (this.person.death) {
      death = `Дата смерти: ${DateHelper.convertDateFromISO(this.person.death)}`
    }

    if (this.person.death && this.person.age) {
      death += ` (${DateHelper.getDeclensionAge(this.person.age)})`
    }

    return death
  }

  private getProferrions(): string {
    if (this.person.profession) {
      return (
        "Профессия: " +
        this.person.profession
          .reduce<string[]>((acc, profession) => {
            acc.push(profession.value)
            return acc
          }, [])
          .join(", ")
      )
    }
    return ""
  }
}
