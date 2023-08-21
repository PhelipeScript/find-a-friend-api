import { Org, Prisma } from '@prisma/client'

export interface OrgsRepository {
  findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
  filterByCity(city: string): Promise<Org[]>
  create(data: Prisma.OrgCreateInput): Promise<Org>
}
