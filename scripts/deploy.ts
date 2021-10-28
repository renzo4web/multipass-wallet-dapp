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
    2
  );

  await walletContract.deployed();

  console.log("MultipassWallet deployed to:", walletContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
