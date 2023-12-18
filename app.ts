import fs from 'fs';
import { getSimpleFinAuth, getAccountsData, getClaimUrl } from './clients/simpleFinClient';
import { init } from './init';
import { prettifyJson } from './utils/json';
import 'dotenv/config';
import { Environment } from './models/enums/environment';

async function run() {
  init();
  console.log("SimpleFIN Bridge");

  const claimUrl: string = getClaimUrl(Environment.SIMPLEFIN_APP_TOKEN);
  const simpleFinAuth = await getSimpleFinAuth(claimUrl);

  // console.log(claimUrl);
  // console.log(await accessUrl.text());

  const accountData = await getAccountsData(simpleFinAuth);
  console.log(accountData.accounts[0].name);
  fs.writeFileSync("./fidelity_data.json", prettifyJson(accountData.accounts));
}

run();