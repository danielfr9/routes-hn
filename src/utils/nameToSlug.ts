/* 
  Example Steps:
    Distrito Central - Francisco Morazan
    distrito central - francisco  morazan
    [distrito central, francisco  morazan]
    distrito-central-francisco-morazan
*/
const nameToSlug = (name: string) => {
  return name
    .toLowerCase()
    .split("-")
    .map((l) =>
      l
        .trim()
        .split(" ")
        .filter((i) => i !== "")
        .join("-")
    )
    .join("-");
};

export default nameToSlug;
