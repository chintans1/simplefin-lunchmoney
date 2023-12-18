import { SimpleFinOrganization } from "./organization"
import { SimpleFinTransaction } from "./transaction"

export type SimpleFinAccount = {
  org: SimpleFinOrganization,
  id: string,
  name: string,
  currency: string,
  balance: string,
  "available-balance"?: string,
  "balance-date": string,
  transactions: [SimpleFinTransaction],
  extra: {}
}