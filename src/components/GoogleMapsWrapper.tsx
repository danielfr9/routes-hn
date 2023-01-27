// import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Loader } from "@mantine/core";
import { LoadScript } from "@react-google-maps/api";
import type React from "react";

const GoogleMapsWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      loadingElement={
        <div className="grow flex justify-center items-center">
          <Loader variant="bars" color="teal" size="xl" />
        </div>
      }
    >
      {children}
    </LoadScript>
  );
};

export default GoogleMapsWrapper;
