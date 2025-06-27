export const TokenType = {
  ForgotPasswordToken: "ForgotPasswordToken",
  AccessToken: "AccessToken",
  RefreshToken: "RefreshToken",
} as const;

export const Role = {
  Owner: "Owner",
  Employee: "Employee",
} as const;

export const RoleValues = [Role.Owner, Role.Employee] as const;

export const DishStatus = {
  Available: "Available",
  Unavailable: "Unavailable",
  Hidden: "Hidden",
} as const;

export const DishStatusValues = [
  DishStatus.Available,
  DishStatus.Unavailable,
  DishStatus.Hidden,
] as const;

export const TableStatus = {
  Available: "Available",
  Hidden: "Hidden",
  Reserved: "Reserved",
} as const;

export const TableStatusValues = [
  TableStatus.Available,
  TableStatus.Hidden,
  TableStatus.Reserved,
] as const;

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Shop";

export const productDefaultValues = {
  name: "",
  slug: "",
  category: "",
  images: [],
  brand: "",
  description: "",
  price: 0,
  stock: 0,
  isFeatured: false,
  banner: null,
};

export const blogDefaultValues = {
  title: "",
  slug: "",
  content: "",
  summary: "",
  image: "",
  isFeatured: false,
  published: false,
  tags: [],
  authorId: "a54484ba-aa60-4d3e-a773-42464a0605f9",
};

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 12;

export const PRICE_RANGES = {
  "under-500k": { min: 0, max: 500000 },
  "500k-1m": { min: 500000, max: 1000000 },
  "1m-2m": { min: 1000000, max: 2000000 },
  "over-2m": { min: 2000000, max: Infinity },
} as const;
