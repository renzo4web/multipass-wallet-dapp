// Renzo Barrios
// Octuber 2021
//
import { expect } from "chai";
import { Contract, ContractFactory, BigNumber, utils } from "ethers";
import { ethers, waffle } from "hardhat";

describe("Wallet", function () {
  let walletContract: Contract;
  let users: any[];
  let provider: any;
  this.beforeEach(async () => {
    users = await ethers.getSigners();
    provider = waffle.provider;
    const [_, rnd1, rnd2, rnd3, unauthorized] = users;

    const WalletFactory: ContractFactory = await ethers.getContractFactory(
      "Wallet"
    );

    walletContract = await WalletFactory.deploy(
      [rnd1.address, rnd2.address, rnd3.address],
      2,
      {
        value: ethers.utils.parseEther("0.1"),
      }
    );
    await walletContract.deployed();
  });

  it("Should have correct approvers and quorum", async () => {
    const [_, rnd1, rnd2, rnd3] = users;
    const approvers = await walletContract.getApprovers();
    const quorum = await walletContract.quorum();

    expect(approvers.length).to.equal(3);
    expect(approvers[0] === rnd1.address).to.equal(true);
    expect(approvers[1] === rnd2.address).to.equal(true);
    expect(approvers[2] === rnd3.address).to.equal(true);
    expect(quorum.toNumber()).to.equal(2);
  });

  it("Should create 3 transfers and return the list of transfers", async function () {
    const [_, rnd1, rnd2, rnd3] = users;

    const transfer1 = await walletContract
      .connect(rnd1)
      .createTransfer(10, rnd2.address);
    transfer1.wait();

    const transfer2 = await walletContract
      .connect(rnd2)
      .createTransfer(3, rnd1.address);
    transfer2.wait();

    const transfer3 = await walletContract
      .connect(rnd3)
      .createTransfer(10, rnd2.address);
    transfer3.wait();

    const transfersTxn = await walletContract.getTransfers();

    expect(transfersTxn.length).to.equal(3);
    // Test genrated id
    expect(transfersTxn[0].id.toNumber() === 0).to.equal(true);
    expect(transfersTxn[1].id.toNumber() === 1).to.equal(true);
    expect(transfersTxn[2].id.toNumber() === 2).to.equal(true);

    // Test correct amount of each transfer
    expect(transfersTxn[0].amount.toString() === "10").to.equal(true);
    // Transfer when is created should be set to sent=false
    expect(transfersTxn[0].sent === false).to.equal(true);
    // Should set the correct address to
    //
    expect(transfersTxn[0].to === rnd2.address).to.equal(true);
  });

  it("Should FAIL when an unauthorized sender try to create a transfer", async () => {
    const [_, rnd1, rnd2, rnd3, unauthorized] = users;

    await expect(
      walletContract.connect(unauthorized).createTransfer(10, rnd2.address)
    ).to.be.revertedWith("only approver allowed");
  });

  it("should increment approvals", async () => {
    const [_, rnd1, rnd2, rnd3] = users;

    const transfer1 = await walletContract
      .connect(rnd1)
      .createTransfer(10, rnd2.address);
    transfer1.wait();

    await walletContract.connect(rnd1).approveTransfer(0);

    const transfersTxn = await walletContract.getTransfers();
    const approvals = transfersTxn[0].approvals.toNumber();
    const isSent = transfersTxn[0].sent;
    const balanceContract = await provider.getBalance(walletContract.address);

    expect(approvals === 1).to.equal(true);
    expect(isSent).to.equal(false);
    expect(
      ethers.utils.formatEther(balanceContract.toString()) === "0.1"
    ).to.equal(true);
  });

  it("should send transfer if quorum reached", async () => {
    const [_, rnd1, rnd2, rnd3] = users;

    const balanceBefore = await provider.getBalance(rnd2.address);

    const transferTo2 = await walletContract
      .connect(rnd1)
      .createTransfer(10, rnd2.address);
    transferTo2.wait();

    await walletContract.connect(rnd1).approveTransfer(0);
    await walletContract.connect(rnd3).approveTransfer(0);

    const balanceAfter = await provider.getBalance(rnd2.address);

    console.log(
      Number(balanceBefore),
      Number(balanceAfter),
      Number(utils.formatEther(balanceAfter)) -
        Number(utils.formatEther(balanceBefore))
    );
  });
});
