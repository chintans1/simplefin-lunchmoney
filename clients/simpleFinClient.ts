import { SimpleFinAuthentication } from '../models/simpleFinAuth';
import { getAuthentication, isAuthPresent, storeAuthenticationDetails } from '../utils/auth';

export function getClaimUrl(setupToken: string): string {
  return atob(setupToken);
}

export async function getSimpleFinAuth(claimUrl: string): Promise<SimpleFinAuthentication> {
  if (isAuthPresent()) {
    console.log("Ignoring claim URL because auth exists...")
    return new Promise(resolve => resolve(getAuthentication()));
  }

  console.log("Found no existing auth details, fetching fresh...");
  const response = await fetch(claimUrl, {
    method: "POST",
    headers: {
      "Content-Length": "0"
    }
  });

  return await response.text().then(fullAccessUrl => {
    // TODO: Handle non-200 responses here
    console.log(`fullAccessUrl: ${fullAccessUrl}`);
    const [scheme, schemelessUrl] = fullAccessUrl.split("//");
    const [auth, url] = schemelessUrl.split('@');

    const authDetails = {
      baseUrl: `${scheme}//${url}`,
      username: auth.split(':')[0],
      password: auth.split(':')[1],
    };
    storeAuthenticationDetails(authDetails);
    return authDetails;
  });
}

export async function getAccountsData(simpleFinAuth: SimpleFinAuthentication) {
  console.log(simpleFinAuth);
  return fetch(`${simpleFinAuth.baseUrl}/accounts?start-date=1702191600`, {
    headers: {
      Authorization: `Basic ${btoa(`${simpleFinAuth.username}:${simpleFinAuth.password}`)}`
    }
  });
}