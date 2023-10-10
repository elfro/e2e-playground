interface IDataTableParser<T> {
  parse(data: string[]): T;
}
