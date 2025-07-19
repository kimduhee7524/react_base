export function getInputValue(el: HTMLInputElement | null): string {
  if (!el) return '';
  return el.type === 'checkbox' ? String(el.checked) : el.value || '';
}
