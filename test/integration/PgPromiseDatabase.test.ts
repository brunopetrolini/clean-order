import PgPromiseDatabase from "../../src/infra/database/PgPromiseDatabase";

describe("PgPromiseDatabase", () => {
  let pgPromiseDatabase: PgPromiseDatabase;

  beforeAll(() => {
    pgPromiseDatabase = PgPromiseDatabase.getInstance();
  });

  test("Should connect to the database and list the items", async () => {
    const items = await pgPromiseDatabase.many("select * from ccca.item", []);
    expect(items).toHaveLength(3);
  });

  test("Should connect to the database and list one item", async () => {
    const item = await pgPromiseDatabase.one(
      "select * from ccca.item where id = $1",
      [1]
    );
    expect(item.description).toBe("Guitarra");
  });
});
