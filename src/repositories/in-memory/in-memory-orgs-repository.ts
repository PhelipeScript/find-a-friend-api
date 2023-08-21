import { randomUUID } from 'node:crypto'
import { Org, Prisma } from '@prisma/client'

import { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async filterByCity(city: string) {
    return this.items.filter((item) => item.city === city)
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      street: data.street,
      street_number: data.street_number,
      complement: data.complement ?? null,
      neighborhood: data.neighborhood,
      zip_code: data.zip_code,
      city: data.city,
      uf: data.uf,
      country: data.country,
      phone: data.phone,
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }
}
