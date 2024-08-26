/**
 * File: transformCase
 * Author: Akshika.choudhary
 * Date: 03-05-2024
 * Description: Util methods to transform case
 */
export class TransformCase {
  /**
   * Method to transform keys of an object to camel case
   * @param obj
   * @returns
   */
  static snakeToCamelCase(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => TransformCase.snakeToCamelCase(item));
    }

    const camelObj = {};
    for (const key in obj) {
      if (Object.hasOwn(obj, key)) {
        const camelKey = key.replace(/_(\w)/g, (_, c) => c.toUpperCase());
        camelObj[camelKey] = obj[key];
      }
    }

    return camelObj;
  }
}
