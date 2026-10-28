import { equilibrium, marketAt } from "./economy";
function positive(...values: number[]) {
  if (values.some((v) => !Number.isFinite(v) || v <= 0))
    throw new RangeError("Expected finite positive values");
}
/** Arc elasticity is undefined if the two prices are identical. */
export function midpointElasticity(
  p1: number,
  q1: number,
  p2: number,
  q2: number,
) {
  positive(p1, q1, p2, q2);
  if (p1 === p2) return null;
  return Math.abs((q2 - q1) / ((q1 + q2) / 2) / ((p2 - p1) / ((p1 + p2) / 2)));
}
/** A teaching demand schedule, not a price-setting competitive firm model. */
export function elasticDemand(price: number, elasticity: number) {
  positive(price, elasticity);
  return 60 * (price / 4) ** -elasticity;
}
export function revenueExperiment(price: number, elasticity: number) {
  const quantity = elasticDemand(price, elasticity);
  return {
    price,
    quantity,
    revenue: price * quantity,
    baselineRevenue: 240,
    arcElasticity: midpointElasticity(4, 60, price, quantity),
  };
}
export type ControlKind = "ceiling" | "floor";
export function priceControl(kind: ControlKind, limit: number) {
  if (!Number.isFinite(limit) || limit < 0)
    throw new RangeError("Invalid price limit");
  const base = equilibrium();
  const binding = kind === "ceiling" ? limit < base.price : limit > base.price;
  const price = binding ? limit : base.price;
  const market = marketAt(price);
  return {
    ...market,
    binding,
    price,
    quantity: Math.min(market.qd, market.qs),
    baseline: base,
  };
}
/** Demand/supply pivots share the same no-tax equilibrium (4,60). Tax UI uses t∈[0,3], d,s∈[5,20]. */
export function taxMarket(
  tax: number,
  d: number,
  s: number,
  collector: "buyer" | "seller" = "seller",
) {
  positive(d, s);
  if (!Number.isFinite(tax) || tax < 0) throw new RangeError("Invalid tax");
  const quantity = 60 - (tax * d * s) / (d + s);
  if (quantity <= 0) throw new RangeError("Interior equilibrium required");
  const buyerPrice = 4 + (tax * s) / (d + s),
    sellerPrice = 4 - (tax * d) / (d + s);
  return {
    buyerPrice,
    sellerPrice,
    quantity,
    revenue: tax * quantity,
    buyerBurden: buyerPrice - 4,
    sellerBurden: 4 - sellerPrice,
    buyerShare: s / (d + s),
    sellerShare: d / (d + s),
    demandElasticity: (d * 4) / 60,
    supplyElasticity: (s * 4) / 60,
    remittedPerUnit: tax,
    invoicePrice: collector === "buyer" ? sellerPrice : buyerPrice,
  };
}
