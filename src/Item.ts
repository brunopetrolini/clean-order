export default class Item {
  code: string;
  description: string;
  price: number;
  width: number;
  height: number;
  length: number;
  weight: number;

  constructor(
    code: string,
    description: string,
    price: number,
    width: number,
    height: number,
    length: number,
    weight: number
  ) {
    this.code = code;
    this.description = description;
    this.price = price;
    this.width = width;
    this.height = height;
    this.length = length;
    this.weight = weight;
  }

  getVolume() {
    return (this.width / 100) * (this.height / 100) * (this.length / 100);
  }
}
