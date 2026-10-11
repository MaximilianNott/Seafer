const baselineFlags = require("./baselineFlags");
const operationalGeneralFlags = require("./operationalGeneralFlags");
const sectorDrivenFlags = require("./sectorDrivenFlags");
const environmentalFlags = require("./environmentalFlags");
const prohibitedFlags = require("./prohibitedFlags");
const {REPRESENTATIVE_OFFICE_FLAGS: representativeOfficeFlags} = require("./representativeOfficeFlags");
const consultingFlags = require("./consultingFlags");
const technologyFlags = require("./technologyFlags");
const tradingFlags = require("./tradingFlags");
const ecommerceFlags = require("./ecommerceFlags");
const manufacturingFlags = require("./manufacturingFlags");
const foodBeverageFlags = require("./foodBeverageFlags");
const educationFlags = require("./educationFlags");
const dataFlags = require("./dataFlags");

/**
 * Safely merges registries while preventing silent duplicate keys.
 * Uses Object.entries destructuring for deterministic iteration.
 */
function mergeRegistries(...registries) {

  const merged = {};

  registries.forEach((registry) => {

    Object.entries(registry).forEach(([key, value]) => {

      // Prevent silent overwrites across registry modules
      if (merged[key]) {
        throw new Error(`Duplicate flag detected: ${key}`);
      }

      merged[key] = value;
    });

  });

  return Object.freeze(merged);
}

console.log("baselineFlags", !!baselineFlags);
console.log("operationalGeneralFlags", !!operationalGeneralFlags);
console.log("sectorDrivenFlags", !!sectorDrivenFlags);
console.log("environmentalFlags", !!environmentalFlags);
console.log("prohibitedFlags", !!prohibitedFlags);
console.log("representativeOfficeFlags", !!representativeOfficeFlags);
console.log("consultingFlags", !!consultingFlags);
console.log("technologyFlags", !!technologyFlags);
console.log("tradingFlags", !!tradingFlags);
console.log("ecommerceFlags", !!ecommerceFlags);
console.log("manufacturingFlags", !!manufacturingFlags);
console.log("foodBeverageFlags", !!foodBeverageFlags);
console.log("educationFlags", !!educationFlags);
console.log("dataFlags", !!dataFlags);

const FLAG_REGISTRY = mergeRegistries(

  // BASELINE
  baselineFlags,

  // REPRESENTATIVE OFFICE
  representativeOfficeFlags,

  // DATA
  dataFlags,

  // GENERAL
  operationalGeneralFlags,
  sectorDrivenFlags,
  environmentalFlags,
  prohibitedFlags,

  // CONSULTING
  consultingFlags,

  // TECHNOLOGY
  technologyFlags,

  // TRADING / ECOMMERCE
  tradingFlags,
  ecommerceFlags,

  // MANUFACTURING
  manufacturingFlags,

  // FOOD & BEVERAGE
  foodBeverageFlags,

  // EDUCATION
  educationFlags
);

module.exports = { FLAG_REGISTRY };