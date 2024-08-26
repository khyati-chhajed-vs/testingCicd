/**
 * File: secretsManager.service
 * Author: Akshika.choudhary
 * Date: 03-05-2024
 * Description: Secret manager class file
 */

import AWS from 'aws-sdk';
import { REGION, STAGES } from '../constants/secret-manager.constant.js';
import { logger } from './logger.service.js';

let gSecret: any = {};

class SecretsManager {
  client: AWS.SecretsManager;

  constructor() {
    this.client = new AWS.SecretsManager({
      region: REGION,
    });
  }

  /**
   * method to set secret
   * @param stage
   * @param secretName
   * @returns
   */
  setSecret = async (stage: string, secretName: string): Promise<any> => {
    stage = stage.toLocaleLowerCase();
    logger.info('SecretsManager class->setSecret method->setSecretValues: stage: ', stage);
    if (stage === STAGES.local) {
      return process.env;
    }
    const secretResponse = await this.client.getSecretValue({ SecretId: secretName }).promise();
    logger.info('SecretsManager class->setSecret method->secrets fetched successfully: ', stage);
    const secret = JSON.parse(secretResponse.SecretString as string);
    gSecret[secretName] = secret;
  };

  /**
   * method to get secrets
   * @param key
   * @returns
   */
  getSecret(key: string) {
    return gSecret[key];
  }
}

export const secretsManager = new SecretsManager();
