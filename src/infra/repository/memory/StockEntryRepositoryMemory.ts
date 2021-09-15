import StockEntry from "../../../domain/entity/StockEntry";
import StockEntryRepository from "../../../domain/repository/StockEntryRepository";

export default class StockEntryRepositoryMemory
  implements StockEntryRepository
{
  stockEntries: StockEntry[];

  constructor() {
    this.stockEntries = [
      new StockEntry(1, "in", 10, new Date("2021-10-10")),
      new StockEntry(2, "in", 10, new Date("2021-10-10")),
      new StockEntry(3, "in", 10, new Date("2021-10-10")),
    ];
  }

  async getByIdItem(idItem: number): Promise<StockEntry[]> {
    return Promise.resolve(
      this.stockEntries.filter((stockEntry) => stockEntry.idItem === idItem)
    );
  }
}
