import { validateEmail, validateName, validatePassword } from "../../../../adapter/gateways/validator/validator-manager";
import { InvalidEmailError } from "../../../error/invalid-email";
import { InvalidNameError } from "../../../error/invalid-name";
import { InvalidPasswordError } from "../../../error/invalid-password";
import { UserEntity } from "../../user";
import { UserData } from "../../userdata.interface";
import { userDataBuilder } from "../helper/user-data-builder";



jest.mock('../../../../adapter/gateways/validator/validator-manager')
const validateNameMock = validateName as jest.Mock
const validateEmailMock = validateEmail as jest.Mock
const validatePasswordMock = validatePassword as jest.Mock


describe('UserEntity', () => {
  let userData: UserData

  beforeEach(() => {

    userData = userDataBuilder({})
    validateNameMock.mockReturnValue(true)
    validateEmailMock.mockReturnValue(true)
    validatePasswordMock.mockReturnValue(true)
  })

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks()
  });

  it('construtor method', () => {
    const userEntity = Reflect.construct(UserEntity, [userData]);
    expect(userEntity).toBeInstanceOf(UserEntity);
    expect(userEntity.props.name).toBe(userData.name);
    expect(userEntity.props.email).toBe(userData.email);
    expect(userEntity.props.password).toBe(userData.password);
    expect(userEntity.props.createAt).toBeInstanceOf(Date);
    jest.resetAllMocks()
  });

  describe('create', () => {
    test('Should return a valid UserEntity when valid input data is provided', () => {
      const result = UserEntity.create(userData)
      expect(result.isRight()).toBe(true);
      expect(validateNameMock).toHaveBeenCalledWith(userData.name);
      expect(validateEmailMock).toHaveBeenCalledWith(userData.email);
      expect(validatePasswordMock).toHaveBeenCalledWith(userData.password);
      expect(validateNameMock).toBeCalledTimes(1);
      expect(validateEmailMock).toBeCalledTimes(1);
      expect(validatePasswordMock).toBeCalledTimes(1);
      jest.resetAllMocks()
    });
  });

  describe('updateUser', () => {
    test('should update the name when valid name is provided', () => {
      const newName = 'new name';
      const result = UserEntity.updateUserWithNewName({
        oldUserData: userData,
        newName,
      });
      expect(result.isRight()).toBe(true); 
      expect(result.value).toBe(newName); 
      expect(validateNameMock).toHaveBeenCalledWith(newName);
      expect(validateNameMock).toBeCalledTimes(1);
      jest.resetAllMocks()
    });
    
    test('should update the password when valid password is provided', () => {
      const newPassword = 'new password';
      const result = UserEntity.updateUserWithNewPassword({
        oldUserData: userData,
        newPassword,
      });
      expect(result.isRight()).toBe(true);
      expect(result.value).toBe(newPassword);
      expect(validatePassword).toHaveBeenCalledWith(newPassword);
      expect(validatePassword).toBeCalledTimes(1);
      jest.resetAllMocks()
    });
  })

  describe('invalid data', () => {
    test('should return InvalidEmailError when password is invalid', () => {
      validatePasswordMock.mockReturnValue(false)
      const invalidPasswords = [
        '',
        'invalid_password',
      ];
      invalidPasswords.forEach((password) => {
        const userDataWithInvalidPassword = {
          ...userData,
          password
        };
        const result = UserEntity.create(userDataWithInvalidPassword);
        expect(validatePassword).toBeCalledWith(password);
        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(InvalidPasswordError);
      });
      jest.resetAllMocks()
    })

    test(`should return InvalidNameError when name is invalid`, () => {
      validateNameMock.mockReturnValue(false)
      const invalidNames = [
        '',
        'invalid name',
      ];
      invalidNames.forEach((name) => {
        const userDataWithInvalidName = {
          ...userData,
          name
        };
        const result = UserEntity.create(userDataWithInvalidName);
        expect(validateName).toBeCalledWith(name);
        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(InvalidNameError);
      });
      jest.resetAllMocks()
    })

    test('should return InvalidEmailError when email is invalid', () => {
      validateEmailMock.mockReturnValue(false)
      const invalidEmails = [
        'invalid-email@email.com',
        '',
      ];
      invalidEmails.forEach((email) => {
        const userDataWithInvalidName = {
          ...userData,
          email
        };
        const result = UserEntity.create(userDataWithInvalidName);
        expect(validateEmail).toBeCalledWith(email);
        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(InvalidEmailError);
      });
      jest.resetAllMocks()
    });
  })
});
