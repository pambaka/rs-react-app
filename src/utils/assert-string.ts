function assertString(value: string | string[] | undefined): string {
  if (typeof value === 'string') return value;
  return '';
}

export default assertString;
