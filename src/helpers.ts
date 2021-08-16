/**
 * Returns an array containing the element(s) provided
 * @param elements
 * @returns any[]
 */
export function toArray(elements: any) {
  if (!Array.isArray(elements)) {
    return [elements];
  } else {
    return elements;
  }
}
