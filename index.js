const { Database } = require("@tableland/sdk");
const { Wallet, getDefaultProvider } = require("ethers");
const dotenv = require("dotenv");
dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
const rpcUrl = process.env.PROVIDER_RPC_URL;

const wallet = new Wallet(privateKey);
const provider = getDefaultProvider(rpcUrl);
const signer = wallet.connect(provider);
const db = new Database({ signer });

const tableName = "test2_84532_60";

//select method
async function select(){
    const query = `SELECT * FROM ${tableName}`;
  
    const result = await db
      .prepare(query)
      .all();

    console.log(result.results);
}

//update method
async function update(){
    const name = 'prueba 1';
    const query = `UPDATE ${tableName} SET (name) = (?) WHERE (id) = (?)`;
  
    const result = await db
      .prepare(query)
      .bind(name, 1)
      .run();
}

//insert method
async function insert(){
  const name = 'prueba 3';
  const query = `INSERT INTO ${tableName} (name) VALUES (?)`;

  const result = await db
    .prepare(query)
    .bind(name)
    .run();
}

async function delete_record(){
  const query = `DELETE FROM ${tableName} WHERE (id) = (?)`;

  const result = await db
    .prepare(query)
    .bind(1)
    .run();  
}

select();
//insert();
//update();
//delete_record();