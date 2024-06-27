import { expect, APIResponse } from "@playwright/test";

export class VerifyResponse {
  async verifyStatusCode(response: APIResponse): Promise<void> {
    await expect(response, `200 Status code was not displayed.`).toBeOK();
  }

  async verifyResponseDataGetUser(
    resp: any,
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    id: number,
    email: string,
    first_name: string,
    last_name: string
  ): Promise<void> {
    await expect(resp.page).toEqual(page);
    await expect(resp.per_page).toEqual(per_page);
    await expect(resp.total).toEqual(total);
    await expect(resp.total_pages).toEqual(total_pages);
    let dataArr = resp.data;
    let items = dataArr.filter(function (dataArr) {
      if (dataArr.id === 7) return dataArr;
    });
    console.log(items);
    items.forEach((element) => {
      expect(element.id).toEqual(id);
      expect(element.email).toEqual(email);
      expect(element.first_name).toEqual(first_name);
      expect(element.last_name).toEqual(last_name);
    });
  }
}
