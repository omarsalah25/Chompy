import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = ({
  id,
  rating,
  imgUrl,
  title,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {
  console.log(genre);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Restaurant", {
          id,
          rating,
          imgUrl,
          title,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
      className="bg-white mr-3 shadow h-67 w-64 rounded-md">
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        className="h-36 w-64 rounded-sm"
      />

      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center  pt-2 space-x-1">
          <StarIcon size={22} opacity={0.5} color="green" />
          <Text className="text-gray-500 text-xs">
            <Text className="text-green-500 ">{rating}</Text>
            {genre.map((genre, indx) => {
              if (genre.name === null) {
              } else {
                const a = [];
                for (let i = 0; i < indx; i++) {
                  a.push(genre.name);
                }

                {
                  return (
                    <Text key={indx}>
                      <>
                        {a.length >= 1 && <Text>, {genre.name}</Text>}{" "}
                        {a.length <= 0 && <Text>. {genre.name}</Text>}
                      </>
                    </Text>
                  );
                }
              }
            })}
          </Text>
        </View>

        <View className="flex-row items-center pt-2 space-x-1">
          <MapPinIcon size={20} color="gray" opacity={0.4} />
          <Text className="text-gray-500 text-xs">Nearby . {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
