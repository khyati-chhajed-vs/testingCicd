/**
 * File: firebaseAuth.service
 * Author: Akshika.choudhary
 * Date: 03-05-2024
 * Description: firebase auth service.
 */

import admin from 'firebase-admin';
import { logger } from './logger.service';
import { secretsManager } from './secretsManager.service';
import { SECRETNAMES } from '../constants/secret-manager.constant';

class FirebaseClient {
  private admin;

  constructor() {
    logger.info('FirebaseClient-> constructor ->initializing firebase admin : ');
    const firebaseconfig = secretsManager.getSecret(SECRETNAMES.firebaseConfig);
    this.admin = admin.initializeApp({
      credential: admin.credential.cert(firebaseconfig),
    });
  }

  /**
   * method to create firebase user
   * @param emailAddress
   * @param phoneNumber
   * @returns
   */
  async createUser(email: string, phoneNumber: string, displayName: string) {
    return await admin.auth().createUser({
      email,
      phoneNumber,
      displayName,
    });
  }

  /**
   * method to genrate reset password link
   * @param emailAddress
   * @returns
   */

  async resetPassword(email: string) {
    const actionCodeSettings = {
      url: process.env.SERVER_FIREBASE_RESET_PASSWORD_URL || 'http://localhost:3000/finishSignIn',
      handleCodeInApp: true,
    };
    return await admin.auth().generatePasswordResetLink(email, actionCodeSettings);
  }

  /**
   * method to set custom claims
   * @param uid
   * @param customClaims
   */
  async setCustomClaims(uid: string, customClaims: { [key: string]: any }): Promise<void> {
    try {
      await this.admin.auth().setCustomUserClaims(uid, customClaims);
    } catch (error) {
      throw new Error(`FirebaseClient-> setCustomClaims ->Error occured while creating user: ${error}`);
    }
  }

  /**
   * method to check if firebase user exist
   * @param uid
   * @returns
   */
  async checkUserExists(uid: string): Promise<boolean> {
    try {
      logger.info('FirebaseClient->checkUserExists-> checking if firebase user exist :', uid);
      const user = await admin.auth().getUser(uid);

      return !!user; // Return true if user exists, false otherwise
    } catch (error) {
      logger.error('FirebaseClient-> checkUserExists ->Error :', error);
      // Other error occurred, throw it for handling
      return false;
    }
  }

  /**
   * Decodes a Firebase token and returns the decoded data along with custom claims.
   * @param {string} token - The Firebase token to decode.
   * @returns {Promise<decodedToken: object>} - Resolves with the decoded token data and custom claims.
   */

  async getDecodedFirebaseToken(token: string) {
    try {
      logger.info('`FirebaseClient-> getDecodedFirebaseToken -> decoding Firebase token');
      return await admin.auth().verifyIdToken(token);
    } catch (error) {
      logger.error('`FirebaseClient-> getDecodedFirebaseToken -> Error decoding Firebase token:', error);
      throw error;
    }
  }

  /**
   * Method to update the firebase user email and phone number
   * @param userId
   * @param emailAddress
   * @param phoneNumber
   * @returns
   */
  async updateUser(userId: string, properties: {}): Promise<string> {
    try {
      const userRecord = await this.admin.auth().updateUser(userId, properties);
      return userRecord.uid;
    } catch (error) {
      throw new Error(`FirebaseClient-> updateUser ->Error updating  user: ${error}`);
    }
  }

  /**
   * Method to get the firebase user details by email.
   * @param email
   * @returns
   */

  async getUserByEmail(email: string) {
    try {
      logger.info(
        `FirebaseClient -> getUserByEmail -> checking if firebase user exist with email: 
        ${email}`,
      );
      return await admin.auth().getUserByEmail(email);
    } catch (error) {
      logger.error('FirebaseClient -> getUserByEmail -> Error : ', error);
    }
  }

  /**
   * Method to get firebase user with phone number
   * @param phoneNumber
   * @returns
   */

  async getUserByPhoneNumber(phoneNumber: string) {
    logger.info(`FirebaseClient-> getUserByPhoneNumber -> getting user`);
    return admin.auth().getUserByPhoneNumber(phoneNumber);
  }

  /**
   * Method to create custom token
   * @param data
   * @returns
   */

  async createCustomToken(data: any) {
    logger.info('FirebaseClient-> createCustomToken -> custom token');
    return await admin.auth().createCustomToken(data);
  }
}

export const firebaseClient = new FirebaseClient();
