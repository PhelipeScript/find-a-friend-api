import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface RegisterPetUseCaseRequest {
  orgId: string
  name: string
  about: string
  age: string
  size: string
  energyLevel: string
  independenceLevel: string
  bestEnvironment: string
  imagesUrl: string
  adoptionRequirement: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    orgId,
    name,
    about,
    age,
    size,
    energyLevel,
    independenceLevel,
    bestEnvironment,
    imagesUrl,
    adoptionRequirement,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      org_id: orgId,
      name,
      about,
      age,
      size,
      energy_level: energyLevel,
      independence_level: independenceLevel,
      best_environment: bestEnvironment,
      image: {
        create: {
          url: imagesUrl,
        },
      },
      requirement: {
        create: {
          title: adoptionRequirement,
        },
      },
    })

    return {
      pet,
    }
  }
}
