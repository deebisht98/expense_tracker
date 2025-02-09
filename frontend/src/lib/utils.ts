export function cn(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
