import { Animal, listedAnimal } from "./model";
import { ContractPromiseBatch, context } from "near-sdk-as";

export function createAnimal(animal: Animal): void {
  let storedAnimal = listedAnimal.get(animal.id);
  if (storedAnimal !== null) {
    throw new Error(`animal with ${animal.id} already exists`);
  }
  if (animal.uploadFee.toString() != context.attachedDeposit.toString()) {
    throw new Error("attached deposit should equal to the animal's price");
  }
  const _animal = new Animal();
  const admin = _animal.getAdmin();
  ContractPromiseBatch.create(admin).transfer(context.attachedDeposit);
  animal.owner = context.sender;
  animal.sold = false;

  listedAnimal.set(animal.id, Animal.fromPayload(animal));
}

export function getAnimal(id: string): Animal | null {
  return listedAnimal.get(id);
}

export function getAnimals(): Animal[] {
  return listedAnimal.values();
}

export function adoptAnimal(animalId: string): void {
  const animal = getAnimal(animalId);
  if (animal == null) {
    throw new Error("animal not found");
  }
  if (animal.sold) {
    throw new Error("animal is not up for adoption");
  }

  if (animal.amount.toString() != context.attachedDeposit.toString()) {
    throw new Error("attached deposit should equal to the animal's price");
  }
  ContractPromiseBatch.create(animal.owner).transfer(context.attachedDeposit);
  animal.owner = context.sender;
  animal.sold = true;
  listedAnimal.set(animal.id, animal);
}

export function releaseAnimal(animalId: string): void {
    const animal = getAnimal(animalId);
    if (animal == null) {
      throw new Error("animal not found");
    }
    if (animal.owner != context.sender) {
      throw new Error(`you are not the owner of this animal ${typeof(animal.owner)} = ${typeof(context.sender.toString())} `);
    }
    animal.owner = context.sender;
    animal.sold = false;
    listedAnimal.set(animal.id, animal);
  }
