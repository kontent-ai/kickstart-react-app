export const interleave = <T>(array: T[], separator: T): T[] => array.flatMap(item => [item, separator]).slice(0, -1);
