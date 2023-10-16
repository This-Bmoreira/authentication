import { InvalidEmailError } from "../../../error/invalid-email";
import { InvalidNameError } from "../../../error/invalid-name";
import { InvalidPasswordError } from "../../../error/invalid-password";
import { UserEntity } from "../../user";
import { UserData } from "../../userdata.interface";
import { userDataBuilder } from "../helper/user-data-builder";


describe('UserEntity', () => {
  let userData: UserData;

  beforeEach(() => {
    userData = userDataBuilder({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('construtor method', () => {
    const userEntity = Reflect.construct(UserEntity, [userData]);
    expect(userEntity).toBeInstanceOf(UserEntity);
    expect(userEntity.props.name).toBe(userData.name);
    expect(userEntity.props.email).toBe(userData.email);
    expect(userEntity.props.password).toBe(userData.password);
    expect(userEntity.props.createAt).toBeInstanceOf(Date);
  });

  describe('create', () => {
    test('Should return a valid UserEntity when valid input data is provided', () => {
      const validateNameSpy = jest.spyOn(UserEntity, 'validateName').mockReturnValue(true);
      const validateEmailSpy = jest.spyOn(UserEntity, 'validateEmail').mockReturnValue(true);
      const validatePasswordSpy = jest.spyOn(UserEntity, 'validatePassword').mockReturnValue(true);

      const result = UserEntity.create(userData);
      expect(result.isRight()).toBe(true);

      expect(validateNameSpy).toHaveBeenCalledWith(userData.name);
      expect(validateEmailSpy).toHaveBeenCalledWith(userData.email);
      expect(validatePasswordSpy).toHaveBeenCalledWith(userData.password);

      expect(validateNameSpy).toBeCalledTimes(1);
      expect(validateEmailSpy).toBeCalledTimes(1);
      expect(validatePasswordSpy).toBeCalledTimes(1);
    });
  });

  describe('updateUser', () => {
    test('should update the name when a valid name is provided', () => {
      const validateNameSpy = jest.spyOn(UserEntity, 'validateName').mockReturnValue(true);;
      const newName = 'new name';

      const result = UserEntity.updateUserWithNewName({
        oldUserData: userData,
        newName,
      });

      expect(result.isRight()).toBe(true);
      expect(result.value).toBe(newName);
      expect(validateNameSpy).toHaveBeenCalledWith(newName);
      expect(validateNameSpy).toBeCalledTimes(1);

      validateNameSpy.mockRestore()
    });

    test('should update the password when a valid password is provided', () => {
      const validatePasswordSpy = jest.spyOn(UserEntity, 'validatePassword').mockReturnValue(true);
      const newPassword = 'new password';

      const result = UserEntity.updateUserWithNewPassword({
        oldUserData: userData,
        newPassword,
      });
      expect(result.isRight()).toBe(true);
      expect(result.value).toBe(newPassword);
      expect(validatePasswordSpy).toHaveBeenCalledWith(newPassword);
      expect(validatePasswordSpy).toBeCalledTimes(1);

      validatePasswordSpy.mockRestore()
    });
  });

  describe('invalid data', () => {
    test('should return InvalidPasswordError when the password is invalid', () => {
      const validatePasswordSpy = jest.spyOn(UserEntity, 'validatePassword').mockReturnValue(false);

      const invalidPasswords = ['', 'invalidPassword'];

      invalidPasswords.forEach((password) => {
        const userDataWithInvalidPassword = {
          ...userData,
          password,
        };
        const result = UserEntity.create(userDataWithInvalidPassword);
        expect(validatePasswordSpy).toBeCalledWith(password);
        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(InvalidPasswordError);
      });

      validatePasswordSpy.mockRestore()
    });

    test('should return InvalidNameError when the name is invalid', () => {
      const validateNameSpy = jest.spyOn(UserEntity, 'validateName').mockReturnValue(false);

      const invalidNames = ['', 'invalid name'];

      invalidNames.forEach((name) => {
        const userDataWithInvalidName = {
          ...userData,
          name,
        };
        const result = UserEntity.create(userDataWithInvalidName);
        expect(validateNameSpy).toBeCalledWith(name);
        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(InvalidNameError);
      });

      validateNameSpy.mockRestore()
    });

    test('should return InvalidEmailError when the email is invalid', () => {
      const validateEmailSpy = jest.spyOn(UserEntity, 'validateEmail').mockReturnValue(false);

      const invalidEmails = ['invalid-email@email.com', ''];

      invalidEmails.forEach((email) => {
        const userDataWithInvalidName = {
          ...userData,
          email,
        };
        const result = UserEntity.create(userDataWithInvalidName);
        console.log(result)
        expect(validateEmailSpy).toBeCalledWith(email);
        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(InvalidEmailError);
      });

      validateEmailSpy.mockRestore()
    });
  });
});
