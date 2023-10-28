import { getRandomB256 } from "fuels";

import { ThreadContractAbi__factory } from "../../generated/contracts";
import { fuelSDK } from "../hooks/useFuel";

async function getContract() {
  const address = await fuelSDK.currentAccount();
  const wallet = await fuelSDK.getWallet(address);
  return ThreadContractAbi__factory.connect(process.env.CONTRACT_ID!, wallet);
}

export class MessageDomain {
  static async send({ msg }: { msg: string }) {
    const contract = await getContract();
    const id = getRandomB256();
    await contract.functions.insert_msg(id, msg).call();
  }

  static async getMessages() {
    const contract = await getContract();
    const { value: ids } = await contract.functions.get_ids().simulate();
    const msgs = await Promise.all(
      ids.map(async (id: string) => {
        const { value: msg } = await contract.functions.get_msg(id).simulate();
        const { value: sender } = await contract.functions
          .get_sender(id)
          .simulate();
        return { id, sender, msg };
      }),
    );
    return msgs;
  }
}
