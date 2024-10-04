import {ID} from 'appwrite';
import { appwriteConfig, account, databases, storage, avatars } from "./config";
import { Query } from 'appwrite';
import { useQueryClient } from '@tanstack/react-query';
import {useState} from "react";


export async function createUserAccount(user)
{
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );

        if(!newAccount) throw Error;

        const avatarURL = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountID : newAccount.$id,
            name:newAccount.name,
            email : newAccount.email,
            username : user.username,
            imageURL : avatarURL,
        });
        return newUser;

    } catch (error) {
        console.log(error)
        return error;
        
    }
}

export async function saveUserToDB(user)
{
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseID,
            appwriteConfig.userCollectionID,
            ID.unique(),
            user
        )
        return newUser;
    } catch (error) {
        console.log(error);
    }
}

export async function signInAccount(user){
    try {
        const session = await account.createEmailPasswordSession(user.email, user.password);
        return session;
    } catch (error) {
        console.log(error)
    }
}
export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      console.log(error);
    }
  }
export async function getCurrentUser () {
    try{
        const currentAccount = await account.get();
        if(!currentAccount) throw Error("Cannot get current account");
    


        const currentUser = await databases.listDocuments(appwriteConfig.databaseID, 
            appwriteConfig.userCollectionID, 
            [Query.equal('accountID', currentAccount.$id)])
        
        if(!currentUser) throw Error("Cannot get current user");

        return currentUser.documents[0];

    }
    catch(error)
    {
        console.log(error)
    }
}

export async function likePost(postId, likesArray)
{
      
    try {
        // Fetch the post document
        const currentUser = await getCurrentUser();
        const userId = currentUser.$id;  // Get the user's Appwrite userId
    
        const post = postId; // Use Mongoose to get the post
        if (!post) {
          throw new Error('Post not found');
        }

        // Check if user has already liked the post
        const likedByArray = post.likedBy || [];

        if (likedByArray.includes(userId)) {
            return post; // Optionally, handle if user has already liked it.
        }

        // Step 3: Add userId to the likedBy array
        likedByArray.push(userId);

        //)
        
    } catch (error) {
        console.log(error);
    }
}
       

export async function signOutAccount() {
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error) {
      console.log(error);
    }
  }
  