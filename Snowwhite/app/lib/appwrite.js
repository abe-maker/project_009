import { Client, Account, Databases, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // z. B. http://localhost/v1 oder Cloud-URL
  .setProject("68d3cc590005969842f5"); // ID aus Appwrite Console

export const account = new Account(client);
export const databases = new Databases(client);
export { ID };
