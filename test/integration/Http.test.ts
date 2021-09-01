import axios from "axios";

describe("Http", () => {
  test.skip("Should request /orders/${code}", async () => {
    const response = await axios({
      url: "http://localhost:3000/orders/202100000001",
      method: "GET",
    });
    const order = response.data;
    expect(order.code).toBe("202100000001");
  });

  test.skip("Should request /orders", async () => {
    const response = await axios({
      url: "http://localhost:3000/orders",
      method: "POST",
      data: {
        cpf: "778.278.412-36",
        zipcode: "37800-000",
        items: [
          { id: "1", quantity: 2 },
          { id: "2", quantity: 1 },
          { id: "3", quantity: 3 },
        ],
        coupon: "VALE20",
      },
    });
    const order = response.data;
    expect(order.total).toBe(5982);
  });
});
