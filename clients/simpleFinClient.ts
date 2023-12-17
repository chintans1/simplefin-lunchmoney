import { SimpleFinAuthentication } from '../models/simpleFinAuth';

export function getClaimUrl(setupToken: string): string {
  return atob(setupToken);
}

export async function getSimpleFinAuth(claimUrl: string): Promise<SimpleFinAuthentication> {
  const response = await fetch(claimUrl, {
    method: "POST",
    headers: {
      "Content-Length": "0"
    }
  });

  return await response.text().then(fullAccessUrl => {
    const [scheme, schemelessUrl] = fullAccessUrl.split("//");
    const [auth, url] = schemelessUrl.split('@');

    return {
      baseUrl: `${scheme}//${url}`,
      username: auth.split(':')[0],
      password: auth.split(':')[1],
    }
  });
}

export async function getAccountsData(simpleFinAuth: SimpleFinAuthentication) {
  return fetch(`${simpleFinAuth.baseUrl}/accounts`, {
    headers: {
      Authorization: `Basic ${btoa(`${simpleFinAuth.username}:${simpleFinAuth.password}`)}`
    }
  });
}