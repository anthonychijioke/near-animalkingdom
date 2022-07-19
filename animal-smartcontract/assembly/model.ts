import { PersistentUnorderedMap, u128, context } from "near-sdk-as";

@nearBindgen
export class Animal {
  id: string;
  owner: string;
  name: string;
  image: string;
  description: string;
  amount: u128;
  sold: bool;
  uploadFee: u128;
  releaseFee: u128;

  public static fromPayload(payload: Animal): Animal {
    const animal = new Animal();
    animal.id = payload.id;
    animal.name = payload.name;
    animal.description = payload.description;
    animal.amount = payload.amount;
    animal.owner = context.sender;
    animal.image = payload.image;
    animal.releaseFee = u128.from(1);
    animal.uploadFee = u128.from(2);
    return animal;
  }

}

export const listedAnimal = new PersistentUnorderedMap<string, Animal>(
  "ANIMAL"
);
