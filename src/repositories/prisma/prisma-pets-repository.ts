import { prisma } from '@/lib/prisma'
import { Org, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async filterByOrgs(orgs: Org[], page: number) {
    const pets = []

    for (let i = 0; i < orgs.length; i++) {
      pets.push(
        ...(await prisma.pet.findMany({
          where: {
            org_id: orgs[i].id,
          },
          take: 20,
          skip: (page - 1) * 20,
        })),
      )
    }

    return pets
  }

  async countByOrgId(orgId: string) {
    const count = await prisma.pet.count({
      where: {
        org_id: orgId,
      },
    })

    return count
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
