export interface UserData {
  name: string
  email: string
  password: string
  createAt?: Date
}

export interface UpdateNameData {
  oldUserData: UserData
  newName: string
}

export interface UpdatePasswordData {
  oldUserData: UserData
  newPassword: string
}
