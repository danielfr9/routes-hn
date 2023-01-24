import data from "./routes.json";
import stops from "./bus-stops.json";
import nameToSlug from "../utils/nameToSlug";

// TODO: Create a script to produce this outputs in their own file

// FIXME: Find a better way to type safe the JSON data
const routesData: Route[] = data as Route[];
export const busStops: BusStop[] = stops;

// Separate unique routes (some of the routes name are repeated with the exact same data except for the code)
let routesMap: Map<string, Route> = new Map();
export const routes = routesData.filter((route) => {
  if (!routesMap.has(route.description) && route.UrlKml !== null) {
    routesMap.set(route.description, route);
    return true;
  }
  return false;
});

// Separate unique locations
let locationSet = new Set<Route["location"]>();
routes.forEach((route) => {
  if (!locationSet.has(route.location)) locationSet.add(route.location);
});

// Create locations array and add default home route "/"
export const locations = [
  { title: "All BUS ROUTES", slug: "/" },
  ...[...locationSet].map((location) => ({
    title: location,
    slug: nameToSlug(location),
  })),
];
