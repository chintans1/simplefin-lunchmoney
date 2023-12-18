export function prettifyJson(data: any): string {
  return JSON.stringify(data, null, 2);
}