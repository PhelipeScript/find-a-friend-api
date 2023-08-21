import { Org, Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async filterByOrgs(orgs: Org[], page: number) {
    const pets = []
    for (const org of orgs) {
      pets.push(...this.items.filter((item) => item.org_id === org.id))
    }

    return pets.slice((page - 1) * 20, page * 20)
  }

  async countByOrgId(orgId: string) {
    return this.items.filter((item) => item.org_id === orgId).length
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      best_environment: data.best_environment,
      created_at: new Date(),
      org_id: data.org_id,
      image: data.image,
      requirement: data.requirement,
    }

    this.items.push(pet)

    return pet
  }
}
