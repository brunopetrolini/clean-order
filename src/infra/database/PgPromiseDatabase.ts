import postgres from "pg-promise";
import Database from "./Database";

export default class PgPromiseDatabase implements Database {
  private postgres: any;
  static instance: PgPromiseDatabase;

  private constructor() {
    this.postgres = postgres()(
      "postgres://postgres:123456@172.17.0.2:5432/app"
    );
  }

  static getInstance() {
    if (!PgPromiseDatabase.instance) {
      PgPromiseDatabase.instance = new PgPromiseDatabase();
    }
    return PgPromiseDatabase.instance;
  }

  many(query: string, parameters: any) {
    return this.postgres.query(query, parameters);
  }

  one(query: string, parameters: any) {
    return this.postgres.oneOrNone(query, parameters);
  }
}
