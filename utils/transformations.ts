import { DraftTransaction as LmDraftTransaction } from "lunch-money";
import { SimpleFinAccount } from "../models/simplefin/account";
import { SimpleFinTransaction } from "../models/simplefin/transaction";

export function getDraftLmTransactionsForAccounts(simpleFinAccounts: SimpleFinAccount[]): LmDraftTransaction[] {
  return simpleFinAccounts.map(account => getDraftLmTransactions(account)).flat();
}

export function getDraftLmTransactions(simpleFinAccount: SimpleFinAccount): LmDraftTransaction[] {
  const availableTransactions: SimpleFinTransaction[] = simpleFinAccount.transactions;

  if (availableTransactions.length === 0) {
    return [];
  }

  const lmTransactions: LmDraftTransaction[] = [];
  for (const transaction of availableTransactions) {
    const date = new Date(transaction.posted * 1000);
    lmTransactions.push({
      date: date.toISOString().split('T')[0],
      amount: transaction.amount,
      payee: transaction.payee || transaction.description,
      currency: simpleFinAccount.currency.toLowerCase(),
      // asset_id: 1, This is not required but ideally we should try to find a way, TODO
      notes: transaction.description,
      status: transaction.pending ? "uncleared" : "cleared",
      // external_id: "", This is not required either but still TODO
    });
  }

  return lmTransactions;
}