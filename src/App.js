import React, { useState, useEffect, useCallback } from "react";
import {
  login,
  logout as destroy,
  accountBalance,
  getAccountId,
} from "./utils/near";
import {
  getAnimals as getAnimalsList,
  adoptAnimal,
  addYourAnimal,
  releaseAnimal

} from "./utils/marketplace";

import "./App.css";


function App() {
  const [animals, setAnimals] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const account = window.walletConnection.account();
  const [balance, setBalance] = useState("0");
  const [loading, setLoading] = useState(false);
  const getBalance = useCallback(async () => {
    if (account.accountId) {
      setBalance(await accountBalance());

      await getAnimals();
    }
  }, [account]);

  useEffect(() => {
    if (!account.accountId) {
      login();
    }
  }, []);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  const getAnimals = useCallback(async () => {
    setLoading(true);
    try {
      const animals = await getAnimalsList();
      setAnimals(animals);
      console.log(animals);

    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  }, [setAnimals, animals]);

  // function to initiate transaction
  const adopt = async (id, amount) => {
    setLoading(true);
    try {
      await adoptAnimal({ id, amount });
      getAnimals();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const release = async (id) => {
    setLoading(true);
    try {
      await releaseAnimal({ id });
      getAnimals();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !amount || !description || !image) return;

      await addYourAnimal({ animal: { name, description, amount, image }})
      getAnimals();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <header className="site-header sticky-top py-1">
        <nav className="container d-flex flex-column flex-md-row justify-content-between">
          <a className="py-2" href="#" aria-label="Product">
            <h3>Animal Kingdom</h3>
          </a>
          <a className="py-2 d-none d-md-inline-block" href="#">
              Balance: {balance} NEAR
            </a>
        </nav>
      </header>
      <main>
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
          {animals.map(animal => <div className="col">
            <div className="card mb-4 rounded-3 shadow-sm">
              <div className="card-header py-3">
                <h4 className="my-0 fw-normal">{animal.name}</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title">${animal.amount / 10 ** 24}<small className="text-muted fw-light">NEAR</small></h1>
                <img width={200} src={animal.image} alt="" />
                <p className="list-unstyled mt-3 mb-4">
                  {animal.description}
                </p>
                {!animal.sold ? animal.owner !== account.accountId && <button type="button"
                  onClick={() => adopt(animal.id, animal.amount)}
                  className="w-100 btn btn-lg btn-outline-primary">Adopt Animal</button>
                  : animal.owner === account.accountId ?
                    <button type="button"
                      onClick={() => release(animal.id)}
                      className="w-100 btn btn-lg btn-outline-danger">Release Animal</button>
                    : "Not the owner"}
              </div>
            </div>
          </div>)}
        </div>
      </main>


      <div className="p-3 w-50 justify-content-center">
        <h2>Add your Animal to be Adopted</h2>
        <div className="">
          <form onSubmit={formSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control rounded-4"
                id="floatingInput"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="floatingInput">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control rounded-4"
                id="floatingInput"
                placeholder="Amount"
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <label htmlFor="floatingInput">Amount</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control rounded-4"
                id="floatingInput"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <label htmlFor="floatingInput">Description</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control rounded-4"
                id="floatingInput"
                placeholder="Image Url"
                onChange={(e) => setImage(e.target.value)}
                required
              />
              <label htmlFor="floatingInput">Image</label>
            </div>

            <button
              className="w-100 mb-2 btn btn-lg rounded-4 btn-primary"
              type="submit"
            >
              Add Your Animal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
