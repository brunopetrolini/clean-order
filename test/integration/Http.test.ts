import axios from "axios";

describe("Http", () => {
  test("Should request /orders/${code}", async () => {
    const response = await axios({
      url: "http://localhost:3000/orders/202100000001",
      method: "GET",
    });
    const order = response.data;
    expect(order.code).toBe("202100000001");
  });
});
