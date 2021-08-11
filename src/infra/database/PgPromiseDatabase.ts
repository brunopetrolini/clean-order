import postgres from "pg-promise";
import Database from "./Database";

export default class PgPromiseDatabase implements Database {
  postgres: any;

  constructor() {
    this.postgres = postgres()(
      "postgres://postgres:123456@172.17.0.2:5432/app"
    );
  }

  many(query: string, parameters: any) {
    return this.postgres.query(query, parameters);
  }

  one(query: string, parameters: any) {
    return this.postgres.oneOrNone(query, parameters);
  }
}
