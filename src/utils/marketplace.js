import { v4 as uuid4 } from "uuid";
import { parseNearAmount } from "near-api-js/lib/utils/format";

const GAS = 100000000000000;

export function addYourAnimal({animal}) {
  animal.id = uuid4();
  animal.amount = parseNearAmount(animal.amount + "");
  console.log(animal);
  return window.contract.createAnimal({ animal }, GAS, parseNearAmount("2"));
}

export function getAnimals() {
  return window.contract.getAnimals();
}

export async function adoptAnimal({ id, amount }) {
    await window.contract.adoptAnimal({ animalId: id }, GAS, amount);
}

export async function releaseAnimal({ id }) {
  await window.contract.releaseAnimal({ animalId: id });
}

