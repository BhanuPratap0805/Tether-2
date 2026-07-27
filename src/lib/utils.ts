type ClassValue = string | number | null | undefined | false | ClassValue[];

/**
 * Lightweight class-name joiner (no external deps). Flattens arrays,
 * drops falsy values, and joins the rest with a single space — enough
 * for this project's needs without pulling in clsx/tailwind-merge.
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
    } else {
      out.push(String(input));
    }
  }
  return out.join(' ');
}
