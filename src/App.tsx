import { GoogleMap } from "@react-google-maps/api";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { routes, locations } from "./assets/data";
import RouteSelector from "./components/RouteSelector";
import nameToSlug from "./utils/nameToSlug";

const App = () => {
  const params = useParams();

  const routesList = useMemo(() => {
    return params.slug
      ? routes.filter((route) => nameToSlug(route.location) === params.slug)
      : routes;
  }, [params.slug]);

  const title = useMemo(() => {
    const location = locations.find(
      (location) => location.slug === params.slug
    );
    return location ? location.title : "All Routes";
  }, [params.slug]);

  return (
    <GoogleMap mapContainerStyle={{ height: "100%", width: "100%" }} zoom={11}>
      <RouteSelector
        currentLocation={params.slug}
        routesList={routesList}
        key={params.slug || "/"}
        title={title}
      />
    </GoogleMap>
  );
};

export default App;
