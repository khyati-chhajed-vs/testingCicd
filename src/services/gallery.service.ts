/**
 * File: plan.service
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 12-06-2024
 * Description: Service to handle Plan's APIs logic
 */

import { Service, Inject } from 'fastify-decorators';
import { BaseService } from '../common/services/base.service';
import { logger } from '../common/services/logger.service';
import { FastifyRequest } from 'fastify';
import { GetGalleryRequest } from '../types/v1';
import { CleaningService } from './cleaning.service';
import { InventoryService } from './inventory.service';
import { IMAGE_CATEGORY } from '../common/constants';

@Service()
export class GalleryService extends BaseService {
  @Inject(CleaningService)
  private cleaningService!: CleaningService;

  @Inject(InventoryService)
  private inventoryService!: InventoryService;

  /**
   * Method to fetch gallery image for given project ID and unit ID
   * @param request
   * @returns
   */
  async getImages(request: FastifyRequest<GetGalleryRequest>) {
    const { project_id, unit_id } = request.params;
    const { limit, offset, category } = request.query;
    try {
      let images =
        category === IMAGE_CATEGORY.INVENTORY
          ? this.dateWiseGrouping(await this.inventoryService.getImages(project_id, unit_id, limit, offset))
          : this.dateWiseGrouping(await this.cleaningService.getCleaningImages(unit_id, project_id, limit, offset));
      return images;
    } catch (error) {
      logger.error(
        `GalleryService -> getImages : Failed to get images for project_id :${project_id} and  unit_id :${unit_id} category : ${category}, error: ${error}`,
      );
      throw error;
    }
  }

  /**
   * Method to group data according to date
   * @param inventoryImages
   * @returns
   */
  private dateWiseGrouping(inventoryImages: any) {
    const groupedData = inventoryImages.reduce((acc, item) => {
      const date = item.add_time;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({
        title: item.title,
        url: item.image_url,
      });
      return acc;
    }, {});
    return Object.keys(groupedData).map((date) => ({
      date: date,
      images: groupedData[date],
    }));
  }
}
