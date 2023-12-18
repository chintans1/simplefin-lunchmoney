export type SimpleFinTransaction = {
  id:	string,
  posted:	string,
  amount: string,
  description: string,
  pending?: boolean
  extra: {}
}