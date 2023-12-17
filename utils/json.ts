export function prettifyJson(data: any): string {
  return JSON.stringify(JSON.parse(data), null, 2);
}