export default class TaxTable {
  idItem: string;
  type: string;
  value: number;

  constructor(idItem: string, type: string, value: number) {
    this.idItem = idItem;
    this.type = type;
    this.value = value;
  }
}
