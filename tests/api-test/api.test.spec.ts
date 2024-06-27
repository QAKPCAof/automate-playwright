import { expect, test } from "@playwright/test";
import { dataApi } from "./api.data.ts";
import { VerifyResponse } from "./api.funtion.ts";

const verifyResponse = new VerifyResponse();
const dataRes = dataApi.getData;
const dataUserList = dataApi.userData;

test("should able to login via api", async ({ request }) => {
  const resp = await request.get(`${dataRes.baseUrl}/users?page=2`);
  const respBody = await resp.json();
  await verifyResponse.verifyResponseDataGetUser(
    respBody,
    dataRes.page,
    dataRes.per_page,
    dataRes.total,
    dataRes.total_pages
  );
});

test("should login successfully", async ({ request }) => {
  const response = await request.post(`${dataRes.baseUrl}`, {
    data: {
      email: dataRes.email,
      password: dataRes.password,
    },
  });
  // Add assertions based on API response
  await verifyResponse.verifyStatusCode(response);
  const responseData = await response.json();
  expect(responseData).toHaveProperty("token");
});
