import { Client, Account, ID } from "react-native-appwrite";
export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io.v1",
  Platform: "com.Sen.Sen",
  projectId: "677fe27b003e577e3f49",
  databaseId: "677fe4dd000b6be2d7c1",
  userCollectionId: "677fe51d0027b7eb8d10",
  docCollectionId: "677fe55f00240a9fe64c",
  productsCollectionId: "677fe58d002769724274",
  storageId: "677ff0280024ac0df6e3",
};
// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.Platform); // Your application ID or bundle ID.
const account = new Account(client);
export const createUser = () => {
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
// Register User
