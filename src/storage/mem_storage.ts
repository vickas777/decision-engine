import { Storage } from '../interfaces/storage.interface';

const userDB = {
  49002010965: 'debt',
  49002010976: 'segment 1',
  49002010987: 'segment 2',
  49002010998: 'segment 3',
};

const segmentDB = {
  debt: -1,
  'segment 1': 100,
  'segment 2': 300,
  'segment 3': 1000,
};

class MemStorage implements Storage {
  private userData: { [key: string]: string };

  private segmentData: { [key: string]: number };

  constructor() {
    this.userData = JSON.parse(JSON.stringify(userDB));
    this.segmentData = JSON.parse(JSON.stringify(segmentDB));
  }

  getModifierByRegCode(regCode: string) {
    if (!{}.hasOwnProperty.call(this.userData, regCode)) {
      return null;
    }

    const userSegment = this.userData[regCode];
    return this.segmentData[userSegment];
  }
}

const instance = new MemStorage();
// eslint-disable-next-line jest/require-hook
Object.freeze(instance);

export default instance;
