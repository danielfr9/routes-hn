import { useState, useMemo, useEffect } from "react";
import {
  ActionIcon,
  Affix,
  Burger,
  Divider,
  Drawer,
  Select,
} from "@mantine/core";
import { KmlLayer, useGoogleMap } from "@react-google-maps/api";
import RoutesDropdown from "./RoutesDropdown";
import { locations, busStops } from "../assets/data";
import { Link } from "react-router-dom";
import { FaBusAlt, FaTaxi } from "react-icons/fa";
import { TbBus } from "react-icons/tb";
import { IoClose } from "react-icons/io5";

type IProps = {
  routesList: Route[];
  title?: string;
  currentLocation: string | number | undefined;
};

const RouteSelector = ({
  currentLocation,
  title = "Title N/D",
  routesList,
}: IProps) => {
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  // Create data object that works with the Select component
  const selectRoutesData = useMemo(() => {
    return routesList.map((route) => ({
      value: route.code,
      label: route.description,
    }));
  }, [routesList]);

  // Handle select element change
  const handleSelectRoute = (code: string | null) => {
    // No code passed by the select component
    if (!code) return;

    // Search route based on index and return the index in the list
    const newRouteIndex = routesList.findIndex((route) => route.code === code);

    // No route was found
    if (newRouteIndex === -1) return;

    setSelectedRouteIndex(newRouteIndex);
  };

  // Using state instead of ref so the current route KML Layer can be render when the Bus Stops KML Layers are loaded
  const [isBusStopsLayersMounted, setBusStopsLayersMounted] = useState(false);

  // Get the map instance for Google Maps
  const map = useGoogleMap();

  // NOTE: The KML layers for the bus stops should load before the current selected route is rendered
  // Set the Kml Layers manually
  useEffect(() => {
    let ignore = false;

    const layers = busStops.map((stop) => {
      return new window.google.maps.KmlLayer({
        url: stop.url,
      });
    });

    const listeners = layers.map((layer, index) => {
      if (index !== layers.length - 1) {
        return google.maps.event.addListener(
          layer,
          "status_changed",
          function () {
            layers[index + 1].setMap(map);
          }
        );
      }
      return google.maps.event.addListener(
        layer,
        "status_changed",
        function () {
          if (!ignore) setBusStopsLayersMounted(true);
        }
      );
    });

    if (layers.length > 0) layers[0].setMap(map);

    return () => {
      listeners.forEach((listener) =>
        google.maps.event.removeListener(listener)
      );
      ignore = true;
    };
  }, []);

  return (
    <>
      {/* TODO: Change the Affix for a div to be part of the content flow, while also remaining on the bottom */}
      <Affix
        position={{ bottom: 0 }}
        className="w-full space-x-6 items-center px-4 p-3 flex bg-[#121F2B]/70"
      >
        {/* Drawer & Home Link */}
        <div>
          <Link
            to="/"
            className="hidden md:inline text-gray-300 font-semibold uppercase text-xl"
          >
            Routes HN
          </Link>
          <Burger
            color="white"
            className="md:hidden"
            classNames={{ root: "border border-gray-400" }}
            opened={isDrawerOpened}
            onClick={() => setIsDrawerOpened((o) => !o)}
            title="Open Drawer"
          />
        </div>

        <Divider orientation="vertical" />

        {/* Current Route Selector */}
        <div className="grow items-center flex justify-center flex-col space-y-2">
          <span className="text-sm whitespace-pre inline-block text-gray-200 font-bold text-center uppercase">
            {title}
          </span>
          <div className="w-full flex space-x-4 items-center max-w-md">
            {routesList[selectedRouteIndex].mode === "TAXI" && (
              <FaTaxi className="text-gray-300" size={24} />
            )}
            {routesList[selectedRouteIndex].mode === "BUS INTERURBANO" && (
              <TbBus className="text-gray-300" size={24} />
            )}
            {routesList[selectedRouteIndex].mode === "BUS URBANO" && (
              <FaBusAlt className="text-gray-300" size={24} />
            )}
            <Select
              withCheckIcon={false}
              classNames={{
                root: "w-full",
                input: "bg-[#354C5A] border-none text-gray-300 w-full",
                dropdown: "bg-[#172026] border-none",
                option:
                  "text-gray-300 data-[combobox-active=true]:bg-[#3D7B7B] data-[combobox-active=true]:hover:bg-[#3D7B7B] data-[combobox-active=true]:hover:bg-[#3D7B7B] hover:bg-gray-700",
              }}
              placeholder="Which route?"
              value={routesList[selectedRouteIndex].code}
              data={selectRoutesData}
              onChange={handleSelectRoute}
            />
          </div>
        </div>

        <Divider className="hidden md:block" orientation="vertical" />

        <div className="relative hidden md:block">
          <RoutesDropdown currentLocation={currentLocation} />
        </div>
      </Affix>

      {/* Selected Route KML Layer */}
      {isBusStopsLayersMounted && (
        <KmlLayer url={routesList[selectedRouteIndex].UrlKml || ""} />
      )}

      <Drawer
        opened={isDrawerOpened}
        onClose={() => setIsDrawerOpened(false)}
        classNames={{
          root: "md:hidden",
          content: "bg-gradient-to-b from-[#1E3448] to-[#121F2B] text-gray-300",
          body: "flex flex-col space-y-6",
        }}
        padding="xl"
        size="lg"
        overlayProps={{
          blur: 3,
        }}
        withCloseButton={false}
      >
        <ActionIcon
          variant="transparent"
          className="border p-1 w-10 h-10 self-end rounded-lg border-transparent hover:border-gray-600 transition-all"
          onClick={() => setIsDrawerOpened(false)}
        >
          <IoClose className="text-gray-300 w-full h-full" />
        </ActionIcon>
        <Link
          to="/"
          className="inline-block text-center text-gray-300 font-bold uppercase text-2xl"
        >
          Routes HN
        </Link>

        <div className="space-y-3">
          {locations.map((location, index) => (
            <Link
              className="block"
              key={index}
              to={`/${location.slug !== "/" ? location.slug : ""}`}
            >
              <div
                className={`transition-all rounded-md cursor-pointer px-3 p-2 text-gray-300 uppercase ${
                  currentLocation === location.slug ||
                  (!currentLocation && location.slug === "/")
                    ? "bg-[#3D7B7B] border-transparent"
                    : "hover:bg-[#3D7B7B]/40 border-gray-400 hover:border-transparent border"
                }`}
              >
                <span className="text-sm">{location.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default RouteSelector;
