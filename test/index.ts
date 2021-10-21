import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

//describe("Greeter", function () {
//it("Should return the new greeting once it's changed", async function () {
//const Greeter = await ethers.getContractFactory("Greeter");
//const greeter = await Greeter.deploy("Hello, world!");
//await greeter.deployed();

//expect(await greeter.greet()).to.equal("Hello, world!");

//const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//// wait until the transaction is mined
//await setGreetingTx.wait();

//expect(await greeter.greet()).to.equal("Hola, mundo!");
//});
//});

describe("Wallet", function () {
  it("Should create 3 transfers and return the list of transfers", async function () {
    const [_, rnd1, rnd2, rnd3] = await ethers.getSigners();

    const WalletFactory: ContractFactory = await ethers.getContractFactory(
      "Wallet"
    );

    const walletContract: Contract = await WalletFactory.deploy(
      [rnd1.address, rnd2.address, rnd3.address],
      1
    );
    await walletContract.deployed();

    const transfer1 = await walletContract.createTransfer(10, rnd1.address);
    transfer1.wait();

    const transfer2 = await walletContract.createTransfer(3, rnd2.address);
    transfer2.wait();

    const transfer3 = await walletContract.createTransfer(10, rnd3.address);
    transfer3.wait();

    const transfersTxn = await walletContract.getTransfers();

    expect(transfersTxn.length).to.equal(3);
  });
});
