import { expect, APIResponse } from "@playwright/test";
import { dataApi } from "./api.data";

export class VerifyResponse {
  async verifyStatusCode(response: APIResponse): Promise<void> {
    await expect(response.status()).toEqual(200);
    // Assuming status() is a function that retrieves the status code from APIResponse
  }

  async verifyResponseDataGetUser(
    resp: any,
    page: number,
    per_page: number,
    total: number,
    total_pages: number
  ): Promise<void> {
    await expect(resp.page).toEqual(page);
    await expect(resp.per_page).toEqual(per_page);
    await expect(resp.total).toEqual(total);
    await expect(resp.total_pages).toEqual(total_pages);

    // Using filter to find items with id === 7
    let dataArr = resp.data;
    let items = dataArr.filter((item: { id: number }) => item.id === 7);

    // Using forEach to iterate over filtered items
    items.forEach((element: any) => {
      // Asserting element.id === 7
      const dataExp = dataApi.userData;
      // Assuming resData is a predefined array of objects you want to match against
      dataExp.forEach((data: any) => {
        // Asserting individual properties of each data object
        expect(element.id).toEqual(data.id);
        expect(element.email).toEqual(data.email);
        expect(element.first_name).toEqual(data.first_name);
        expect(element.last_name).toEqual(data.last_name);
      });
    });
  }
}
