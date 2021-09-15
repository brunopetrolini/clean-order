import StockEntry from "../entity/StockEntry";

export default interface StockEntryRepository {
  getByIdItem(idItem: number): Promise<StockEntry[]>;
}
