import { Button, Menu } from "@mantine/core";
import { Link } from "react-router-dom";
import { locations } from "../assets/data";

const RoutesDropdown = ({
  currentLocation,
}: {
  currentLocation: string | number | undefined;
}) => {
  return (
    <Menu
      shadow="md"
      width={300}
      position="top-end"
      classNames={{
        dropdown: "bg-[#0C151D] border-0 p-1",
      }}
      offset={20}
    >
      <Menu.Target>
        <Button className="border border-gray-400 text-md hover:bg-[#3D7B7B] hover:border-transparent hover:text-white transition-colors ease-linear">
          Locations
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {locations.map((location, index) => (
          <Link
            key={index}
            to={`/${location.slug !== "/" ? location.slug : ""}`}
          >
            <Menu.Item
              className={`font-semibold text-white ${
                currentLocation === location.slug ||
                (!currentLocation && location.slug === "/")
                  ? "bg-[#3D7B7B] data-[hovered=true]:bg-[#3D7B7B]"
                  : "data-[hovered=true]:bg-[#3D7B7B]/40"
              }`}
            >
              <span className="text-xs capitalize">{location.title}</span>
            </Menu.Item>
          </Link>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default RoutesDropdown;
