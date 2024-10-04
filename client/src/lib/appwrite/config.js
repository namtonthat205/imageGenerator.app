import {Client, Account, Databases, Storage, Avatars} from 'appwrite'

export const appwriteConfig = {
    projectId : '66f9c2e100074c695b6a',
    url : 'https://cloud.appwrite.io/v1',
    databaseID : '66f9dc300006ec2c7b14',
    storageID : '66f9dbfb003c6a3bc641',
    userCollectionID : '66f9dce2000dc4334f02',
    postCollectionID: '66f9dc9c002e0f9d9dd8',
    savesCollectionID:'66f9dcf9001ba6c2195c',

}

export const client = new Client();
client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
