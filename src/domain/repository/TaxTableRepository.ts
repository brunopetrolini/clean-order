import TaxTable from "../entity/TaxTable";

export default interface TaxTableRepository {
  getByIdItem(idItem: string): Promise<TaxTable[]>;
}
