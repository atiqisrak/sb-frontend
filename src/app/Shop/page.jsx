import AccessoriesShop from "../components/AccessoriesShop/page";
import BikeShop from "../components/BikesShop/page";

export default function Shop() {
  return (
    <div>
      <h1>Shop Page</h1>
      <BikeShop />
      <AccessoriesShop />
    </div>
  );
}
