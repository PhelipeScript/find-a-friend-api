import { Org, Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  filterByOrgs(orgs: Org[], page: number): Promise<Pet[]>
  countByOrgId(orgId: string): Promise<number>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
