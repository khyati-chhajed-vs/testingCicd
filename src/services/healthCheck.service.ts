// /**
//  * File: health.service
//  * Author: MANOJ.FULARA@VECTOSCALAR.COM
//  * Date: 14-06-2024
//  * Description:  service layer for handling health apis logic
//  */

// import { Service } from 'fastify-decorators';

// import { BaseService } from '../common/services/base.service';
// import os from 'os';
// import diskusage from 'diskusage';
// import { SequelizeClient } from '../clients';
// import { SERVER_STATUS } from '../common/constants';
// import { logger } from '../common/services/logger.service';

// @Service()
// export class HealthService extends BaseService {
//   /**
//    * method to fetch health check data
//    * @param token
//    * @returns
//    */
//   async checkHealth() {
//     logger.debug(`HealthService ->checkHealth :: checking health status of server`);
//     const memory_info = await this.getMemoryInfo();
//     const disk_info = await this.getDiskInfo();
//     const database_connection = await this.checkDatabaseConnection();

//     // Overall health status
//     const overall_status = database_connection.status && disk_info.status && memory_info.status;

//     return {
//       overall_status,
//       memory_info,
//       disk_info,
//       database_connection,
//     };
//   }

//   /**
//    * Method to get memory information
//    * @returns
//    */
//   private async getMemoryInfo() {
//     const totalMemory = os.totalmem() / (1024 * 1024);
//     const freeMemory = os.freemem() / (1024 * 1024);
//     const usedMemory = totalMemory - freeMemory;
//     const memoryUsagePercentage = (usedMemory / totalMemory) * 100;
//     const isMemoryOk = memoryUsagePercentage <= Number(process.env.MEMORY_USAGE_THRESHOLD);

//     return {
//       status: isMemoryOk ? SERVER_STATUS.UP : SERVER_STATUS.DOWN,
//       totalMemory,
//       freeMemory,
//       usedMemory,
//       memoryUsagePercentage: memoryUsagePercentage.toFixed(2),
//     };
//   }

//   /**
//    * Method to fetch disk information
//    * @returns
//    */
//   private async getDiskInfo() {
//     try {
//       const diskUsageInfo = await this.getDiskUsage('/');
//       const totalSpace = diskUsageInfo.total / (1024 * 1024);
//       const freeSpace = diskUsageInfo.free / (1024 * 1024);
//       const usedSpace = totalSpace - freeSpace;
//       const diskUsagePercentage = (usedSpace / totalSpace) * 100;
//       const isDiskOk = diskUsagePercentage <= Number(process.env.DISK_USAGE_THRESHOLD);

//       return {
//         status: isDiskOk ? SERVER_STATUS.UP : SERVER_STATUS.DOWN,
//         totalSpace,
//         freeSpace,
//         usedSpace,
//         diskUsagePercentage: diskUsagePercentage.toFixed(2),
//       };
//     } catch (error) {
//       logger.error('HealthService -> checkDatabaseConnection :: Error retrieving disk information:', error);

//       return {
//         status: SERVER_STATUS.DOWN,
//         totalSpace: 0,
//         freeSpace: 0,
//         usedSpace: 0,
//         diskUsagePercentage: '0.00',
//       };
//     }
//   }

//   /**
//    * Method to check disk usage
//    * @param path
//    * @returns
//    */
//   private async getDiskUsage(path: string): Promise<any> {
//     try {
//       return await new Promise((resolve, reject) => {
//         diskusage.check(path, (err: any, info: any) => {
//           if (err) {
//             reject(new Error(`Failed to get disk usage: ${err.message}`));
//           } else {
//             resolve(info);
//           }
//         });
//       });
//     } catch (error) {
//       throw new Error(`Failed to get disk usage: ${error}`);
//     }
//   }

//   /**
//    * Method to check database connection
//    * @returns
//    */
//   private async checkDatabaseConnection() {
//     let status: string = SERVER_STATUS.UP;
//     try {
//       await SequelizeClient.sequelize.authenticate().catch((error) => {
//         logger.error('HealthService -> checkDatabaseConnection :: Unable to connect to the database:' + error.message);
//         throw error;
//       });
//     } catch (error) {
//       logger.error('HealthService -> checkDatabaseConnection :: Error checking database connection:', error);
//       status = SERVER_STATUS.DOWN;
//     }
//     return {
//       status,
//     };
//   }
// }
