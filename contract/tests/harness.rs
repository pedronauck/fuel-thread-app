use fuels::{
    prelude::*,
    types::{Bits256, ContractId},
};

// Load abi from json
abigen!(Contract(
    name = "ThreadContract",
    abi = "out/debug/thread-contract-abi.json"
));

async fn get_contract_instance() -> (ThreadContract<WalletUnlocked>, ContractId) {
    // Launch a local network and deploy the contract
    let mut wallets = launch_custom_provider_and_get_wallets(
        WalletsConfig::new(
            Some(1),             /* Single wallet */
            Some(1),             /* Single coin (UTXO) */
            Some(1_000_000_000), /* Amount per coin */
        ),
        None,
        None,
    )
    .await;
    let wallet = wallets.pop().unwrap();

    let id = Contract::load_from(
        "./out/debug/thread-contract.bin",
        LoadConfiguration::default(),
    )
    .unwrap()
    .deploy(&wallet, TxParameters::default())
    .await
    .unwrap();

    let instance = ThreadContract::new(id.clone(), wallet);

    (instance, id.into())
}

#[tokio::test]
async fn can_insert_msg() {
    let (contract, _id) = get_contract_instance().await;
    let msg = String::from("Hi sir, how you doing?");
    let id = Bits256::zeroed();

    let response = contract.methods().insert_msg(id, msg).call().await.unwrap();
    let ids_res = contract.methods().get_ids().call().await.unwrap();
    assert_eq!(response.value, ids_res.value[0]);
}
