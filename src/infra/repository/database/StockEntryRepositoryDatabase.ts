import StockEntry from "../../../domain/entity/StockEntry";
import StockEntryRepository from "../../../domain/repository/StockEntryRepository";
import Database from "../../database/Database";

export default class StockEntryRepositoryDatabase
  implements StockEntryRepository
{
  constructor(private readonly database: Database) {}

  async getByIdItem(idItem: number): Promise<StockEntry[]> {
    const stockEntriesData = await this.database.many(
      "select * from ccca.stock_entry where id_item = $1",
      [idItem]
    );
    const stockEntries = [];
    for (const stockEntryData of stockEntriesData) {
      stockEntries.push(
        new StockEntry(
          stockEntryData.id_item,
          stockEntryData.operation,
          stockEntryData.quantity,
          new Date()
        )
      );
    }
    return stockEntries;
  }
}
