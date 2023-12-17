import { getSimpleFinAuth, getAccountsData, getClaimUrl } from './clients/simpleFinClient';
import { init } from './init';
import { prettifyJson } from './utils/json';
import 'dotenv/config';

async function run() {
  init();
  console.log("SimpleFIN Bridge");

  const demoToken = process.env.SIMPLEFIN_DEMO!;
  const claimUrl: string = getClaimUrl(demoToken);
  const simpleFinAuth = await getSimpleFinAuth(claimUrl);

  // console.log(claimUrl);
  // console.log(await accessUrl.text());

  const accountData = await getAccountsData(simpleFinAuth);

  console.log(accountData);
  console.log(prettifyJson(await accountData.text()));
}

run();