import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface FetchPetsUseCaseRequest {
  city: string
  page: number
  age?: 'puppy' | 'adult' | 'mature' | 'senior'
  size?: 'small' | 'medium' | 'large' | 'giant'
  energyLevel?: 'low' | 'medium' | 'high'
  independenceLevel?: 'low' | 'medium' | 'high'
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    city,
    page,
    age,
    size,
    energyLevel,
    independenceLevel,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const orgs = await this.orgsRepository.filterByCity(city)

    let pets = await this.petsRepository.filterByOrgs(orgs, page)

    if (age) {
      pets = pets.filter((pet) => pet.age === age)
    }

    if (size) {
      pets = pets.filter((pet) => pet.size === size)
    }

    if (energyLevel) {
      pets = pets.filter((pet) => pet.energy_level === energyLevel)
    }

    if (independenceLevel) {
      pets = pets.filter((pet) => pet.independence_level === independenceLevel)
    }

    return {
      pets,
    }
  }
}
