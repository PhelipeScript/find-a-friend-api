import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { Org } from '@prisma/client'

interface RegisterOrgUseCaseRequest {
  name: string
  email: string
  password: string
  street: string
  streetNumber: string
  complement: string | null
  neighborhood: string
  zipCode: string
  city: string
  uf: string
  country: string
  phone: string
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    street,
    streetNumber,
    complement,
    neighborhood,
    zipCode,
    city,
    uf,
    country,
    phone,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      street,
      street_number: streetNumber,
      complement,
      neighborhood,
      zip_code: zipCode,
      city,
      uf,
      country,
      phone,
    })

    return {
      org,
    }
  }
}
