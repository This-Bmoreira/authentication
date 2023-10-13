import type { UserData } from '../../userdata.interface'

interface Data {
  name?: string
  email?: string
  password?: string
  createAt?: Date
}

export function userDataBuilder (props: Data): UserData {
  return {
    name: props.name ?? 'any name',
    email: props.email ?? 'any@email.com',
    password: props.password ?? 'P@ssw0rd',
    createAt: props.createAt ?? new Date()
  }
}
