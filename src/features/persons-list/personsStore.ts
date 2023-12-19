import { runInAction, makeAutoObservable, toJS } from 'mobx'
import { faker } from '@faker-js/faker'

export class PersonsStore {
  isLoading = true
  persons: Person[] = []
  filteredPersons: Person[] = []

  constructor() {
    makeAutoObservable(this)
    this.#loadPersons()
  }

  removePerson(person: Person) {
    this.persons.splice(this.persons.findIndex(({ id }) => id === person.id), 1)
    this.filteredPersons.splice(this.filteredPersons.findIndex(({ id }) => id === person.id), 1)
  }

  filterBy(filterString: string) {
    const preparedFilterString = filterString.toLowerCase().trim()

    if (preparedFilterString === '') {
      this.filteredPersons = this.persons
      return
    }

    this.filteredPersons = this.persons.filter(
      ({ fullName }) => fullName.toLowerCase().includes(preparedFilterString),
    )
  }

  get male() {
    return this.filteredPersons.filter(({ sex }) => sex === 'male')
  }

  get female() {
    return this.filteredPersons.filter(({ sex }) => sex === 'female')
  }

  get malePercent() {
    return this.male.length / this.filteredPersons.length
  }

  get femalePercent() {
    return this.female.length / this.filteredPersons.length
  }

  get maleSalary() {
    return this.male.reduce((sum, { salary }) => sum + salary, 0) / this.male.length
  }

  get femaleSalary() {
    return this.female.reduce((sum, { salary }) => sum + salary, 0) / this.female.length
  }

  #loadPersons() {
    this.isLoading = true
    this.persons = []
    // Emulation fetching from API
    setTimeout(() => runInAction(() => {
      for (let i = 0; i < 1000; i++) {
        const person = new Person()
        this.persons.push(person) 
      }
      this.filteredPersons = this.persons.slice()

      this.isLoading = false
    }), 2000)
  }
}

export class Person {
  id = ''
  firstName = ''
  lastName = ''
  sex: 'male' | 'female' = 'male'
  salary = 0
  bio = ''

  constructor() {
    makeAutoObservable(this, {
      id: false,
    })

    this.id = faker.string.uuid()
    this.sex = faker.person.sex() as 'male' | 'female'
    this.firstName = faker.person.firstName(this.sex)
    this.lastName = faker.person.lastName(this.sex)
    this.salary = faker.number.int({ min: 1e4, max: 1e5 })
    this.bio = faker.person.bio() + '\n' + faker.lorem.paragraph()
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  toJSON() {
    return {
      ...toJS(this),
      fullName: this.fullName,
    }
  }
}
