import { Client, Account, ID, Databases, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("649dace89612db01cd6f");

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, storage, databases, ID };
