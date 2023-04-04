import { View, Text, TouchableOpacity, Image } from "react-native";
import Currency from "react-currency-formatter";
import React, { useState } from "react";
import { urlFor } from "../sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from "../features/basketSlice";

const DishRow = ({ id, name, price, short_description, image }) => {
  const [isPressed, setisPressed] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, price, short_description, image }));
  };

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        className={`p-4 w-full bg-white border border-gray-300 ${
          isPressed && "border-b-0"
        }`}
        onPress={() => setisPressed(!isPressed)}>
        <View className="flex-row">
          <View className="flex-1 space-y-3">
            <Text className="text-lg mb-1 ">{name}</Text>
            <Text className="text-sm text-gray-400">{short_description}</Text>
            <Text className="text-gray-500 mt-2">
              <Currency quantity={price} currency="EGP" locale="ar_EG" />
            </Text>
          </View>
          <View>
            <Image
              source={{ uri: urlFor(image).url() }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row space-x-2 items-center">
            <TouchableOpacity onPress={removeItemFromBasket}>
              <MinusCircleIcon
                size={40}
                color={items.length > 0 ? "#6ccecd" : "gray"}
              />
            </TouchableOpacity>

            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon size={40} color="#6ccecd" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
