import fs from 'fs';
import { getSimpleFinAuth, getAccountsData, getClaimUrl } from './clients/simpleFinClient';
import { init } from './init';
import { prettifyJson } from './utils/json';
import 'dotenv/config';
import { Environment } from './models/enums/environment';

async function run() {
  init();
  console.log("SimpleFIN Bridge");
  console.log(Environment.SIMPLEFIN_APP_TOKEN);

  const claimUrl: string = getClaimUrl(Environment.SIMPLEFIN_APP_TOKEN);
  const simpleFinAuth = await getSimpleFinAuth(claimUrl);

  // console.log(claimUrl);
  // console.log(await accessUrl.text());

  const accountData = await getAccountsData(simpleFinAuth);

  console.log(accountData);
  const data = prettifyJson(await accountData.text());
  fs.writeFileSync("./fidelity_data.json", data);
}

run();