import { ContractFactory, Contract } from "ethers";
import { ethers } from "hardhat";

async function main(): Promise<void> {
  const WalletFactory: ContractFactory = await ethers.getContractFactory(
    "Wallet"
  );
  //
  const [_, rnd1, rnd2] = await ethers.getSigners();
  const walletContract: Contract = await WalletFactory.deploy(
    [rnd1.address, rnd2.address],
    1
  );

  await walletContract.deployed();

  console.log("MultipassWallet deployed to:", walletContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
