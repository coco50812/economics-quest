/** Interior competitive equilibrium; a,b ∈ [-30,30] keep P,Q positive. */
export function equilibrium(a = 0, b = 0) {
  const price = (80 + a - b) / 20;
  return { price, quantity: 60 + (a + b) / 2 };
}
export function demand(price: number, a = 0) {
  return Math.max(0, 100 + a - 10 * price);
}
export function supply(price: number, b = 0) {
  return Math.max(0, 20 + b + 10 * price);
}
export function marketAt(price: number, a = 0, b = 0) {
  const qd = demand(price, a),
    qs = supply(price, b);
  return {
    qd,
    qs,
    shortage: Math.max(0, qd - qs),
    surplus: Math.max(0, qs - qd),
  };
}
export function allocate(study: number, work: number) {
  const s = Math.max(0, Math.min(12, Math.round(study)));
  const w = Math.max(0, Math.min(12 - s, Math.round(work)));
  return { study: s, work: w, leisure: 12 - s - w, income: 30 * w };
}
