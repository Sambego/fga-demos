import dotenv from "dotenv";

// Load environment variables
dotenv.config({ debug: false, path: "./.env.local" });

export function getBrandName() {
  return process.env.FGA_BRAND || 'OpenFGA';
}

export function getBrandDisplayName() {
  const brand = getBrandName();
  return brand;
}
