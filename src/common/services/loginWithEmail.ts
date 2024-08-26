/**
 * File: loginWithEmail
 * Author: Akshika.choudhary
 * Date: 25-07-2024
 * Description: firebase auth service.
 */

import axios from 'axios';
import { logger } from './logger.service';
import { secretsManager } from './secretsManager.service';
import { SECRETNAMES } from '../constants/secret-manager.constant';

const FIREBASE_API_KEY =
  secretsManager.getSecret(SECRETNAMES.firebaseConfig).SERVER_FIREBASE_API_KEY ?? process.env.SERVER_FIREBASE_API_KEY;

/**
 * Function to log in with email and password using Firebase Authentication
 *
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} - The response from Firebase Authentication API.
 */

export const loginWithEmail = async (email: string, password: string) => {
  logger.info(`loginWithEmail -> loginWithEmail -> fuction to log in with email with email : ${email}`);

  return await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true,
    },
  );
};
