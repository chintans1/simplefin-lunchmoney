import fs from 'fs';
import { getSimpleFinAuth, getAccountsData, getClaimUrl } from './clients/simpleFinClient';
import { init } from './init';
import { prettifyJson } from './utils/json';
import 'dotenv/config';

async function run() {
  init();
  console.log("SimpleFIN Bridge");

  const demoToken = process.env.SIMPLEFIN_APP_TOKEN!;
  const claimUrl: string = getClaimUrl(demoToken);
  const simpleFinAuth = await getSimpleFinAuth(claimUrl);

  // console.log(claimUrl);
  // console.log(await accessUrl.text());

  const accountData = await getAccountsData(simpleFinAuth);

  console.log(accountData);
  const data = prettifyJson(await accountData.text());
  fs.writeFileSync("./fidelity_data.json", data);
}

run();