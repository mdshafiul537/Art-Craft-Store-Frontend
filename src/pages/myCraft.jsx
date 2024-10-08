import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import { isEmptyOrNull, onNotifyError, onNotifySuccess } from "../utils/helper";
import ItemCard from "../Components/Utils/ItemCard";
import axios from "axios";
import { AuthContext } from "../Context/AuthProvider";
import Loading from "../Components/Utils/Loading";
import { REQUEST_HEADER } from "../utils/type";
import MyItemCard from "../Components/Utils/MyItemCard";

const MyArtAndCraft = ({ ...props }) => {
  const { user } = useContext(AuthContext);
  const [artCrafItems, setArtCrafItems] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const queryName = !isEmptyOrNull(user?.email)
      ? user?.email
      : user?.displayName;
    axios
      .get(`${import.meta.env.VITE_API_URL}/products/users/query?user=${queryName}`, {
        headers: REQUEST_HEADER,
      })
      .then(({ data }) => {
        if (!isEmptyOrNull(data)) {
          if (data.status) {
            setArtCrafItems(data.response);
            onNotifySuccess(data.message);
            setIsDataLoading(false);
          }
        }
        setIsLoading(false);
      })
      .catch((error) => {
        onNotifyError("User art & craft not found");
      });
  }, [user]);

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="flex flex-row gap-8 items-center my-6">
          <div>
            <h2 className="text-xl font-bold text-nowrap">My Art & Carft</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {artCrafItems?.map((item) => {
            return (
              <div className="" key={`category-item-${item?._id}`}>
                <MyItemCard item={item} />
              </div>
            );
          })}
        </div>
        {artCrafItems.length == 0 ? (
          <div className="w-full flex flex-col gap-4 justify-center items-center h-[200px]">
            <span className="font-semibold text-lg">
              Art & Craft not add yet
            </span>
            <NavLink
              to={"/add-items"}
              className="bg-green-500 px-4 py-1 text-white"
            >
              Go Add Item
            </NavLink>{" "}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MyArtAndCraft;
