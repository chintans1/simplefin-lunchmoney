import fs from 'fs';
import { getSimpleFinAuth, getAccountsData, getClaimUrl } from './clients/simpleFinClient';
import { init } from './init';
import { prettifyJson } from './utils/json';
import 'dotenv/config';
import { Environment } from './models/enums/environment';
import { getDraftLmTransactionsForAccounts } from './utils/transformations';
import { createTransactions } from './clients/lunchMoneyClient';

async function run() {
  init();
  console.log("SimpleFIN Bridge");

  const claimUrl: string = getClaimUrl(Environment.SIMPLEFIN_APP_TOKEN);
  const simpleFinAuth = await getSimpleFinAuth(claimUrl);

  const accountData = await getAccountsData(simpleFinAuth);
  fs.writeFileSync("./fidelity_data.json", prettifyJson(accountData.accounts));

  if (accountData.errors.length > 0) {
    console.log(`Found errors in accounts response:\n${accountData.errors.join("\n")}`);
  }

  const draftTransactions = getDraftLmTransactionsForAccounts(accountData.accounts);
  fs.writeFileSync("./lm_transactions.json", prettifyJson(draftTransactions));
  console.log(`Pushing transactions to LM...`);
  await createTransactions(draftTransactions).then(resolve => console.log(resolve));
}

run();