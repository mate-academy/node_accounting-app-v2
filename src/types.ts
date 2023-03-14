export interface User {
  'id': number,
  'name': string,
}

export interface Expenses {
  'id': number,
  'userId': number,
  'spentAt': string,
  'title': string,
  'amount': number,
  'category': string,
}
