import { PersistentUnorderedMap, u128, context } from "near-sdk-as";

@nearBindgen
export class Animal {
  id: string;
  owner: string;
  admin: string;
  name: string;
  image: string;
  description: string;
  amount: u128;
  sold: bool;
  uploadFee: u128;
  releaseFee: u128;

  constructor() {
    this.admin = context.sender;
  }
  public static fromPayload(payload: Animal): Animal {
    const animal = new Animal();
    animal.id = payload.id;
    animal.name = payload.name;
    animal.description = payload.description;
    animal.amount = payload.amount;
    animal.owner = context.sender;
    animal.image = payload.image;
    animal.admin = context.sender;
    animal.releaseFee = u128.from(1);
    animal.uploadFee = u128.from(2);
    return animal;
  }

  getAdmin(): string {
    return this.admin;
  }
}

export const listedAnimal = new PersistentUnorderedMap<string, Animal>(
  "ANIMAL"
);
