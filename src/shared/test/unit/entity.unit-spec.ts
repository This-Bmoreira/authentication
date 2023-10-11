import { validate as isUUIDvalidate } from 'uuid';
import { generateUUID } from "../../../adapter/gateways/uuid/uuid-manager";
import { userDataBuilder } from '../../../core/entity/test/helper/user-data-builder';
import UserData from "../../../core/entity/userdata.interface";
import { Entity } from "../../entity";
type StubData = {
  name: string
  email: string
  password: string
  createAt?: Date
}

jest.mock('../../../adapter/gateways/uuid/uuid-manager', () => {
  return {
    generateUUID: jest.fn().mockReturnValue('a4700eae-9bba-4992-9e97-963fcec6a1ae'),
  };
});


class StubEntity extends Entity<StubData> {}

const makeSut = (userdata: UserData, id?: string): StubEntity => {
  return new StubEntity(userdata, id);
};

describe('Entity', () => {
  let sut: StubEntity;
  let userData: UserData;

  beforeEach(() => {
    userData = userDataBuilder({});
    sut = new StubEntity(userData);
  });

  it('should set props and id when id is not provided', async () => {
    expect(sut.props).toStrictEqual(userData);
    expect(generateUUID).toHaveBeenCalledTimes(1);
    expect(sut.id).not.toBeNull();
    expect(sut.id).not.toBeUndefined();
  });

  it('should set props and id when id is provided', async () => {
    const id = '38255c34-2b66-46ae-bdce-7987ff4973c9';
    sut = makeSut(userData, id);

    expect(sut.props).toStrictEqual(userData);
    expect(isUUIDvalidate(id)).toBeTruthy();
    expect(sut.id).not.toBeUndefined();
  });

  it('should set props and id even if id is invalid', async () => {
    const id = 'invalid-uuid';
    sut = makeSut(userData, id);

    expect(sut.props).toStrictEqual(userData);
    expect(isUUIDvalidate(id)).toBeFalsy();
    expect(sut.id).not.toBeUndefined();
  });

  it('should return a JSON object with the entity data', async () => {
    const id = 'a4700eae-9bba-4992-9e97-963fcec6a1ae';
    const expectedJSONResult = {
      value: {
        id,
        ...userData,
      },
    };

    expect(sut.toJSON()).toEqual(expectedJSONResult);
  });
});
