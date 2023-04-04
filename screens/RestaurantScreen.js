import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import { StarIcon } from "react-native-heroicons/solid";
import {
  MapPinIcon,
  ArrowDownLeftIcon,
  ArrowLeftIcon,
} from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const {
    params: {
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
    },
  } = useRoute();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <BasketIcon />

      <ScrollView>
        <View className="relative">
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className="h-56 w-full rounded-sm"
          />
          <TouchableOpacity
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full "
            onPress={navigation.goBack}>
            <ArrowLeftIcon size={20} color="#6ccecd" />
          </TouchableOpacity>
          <View className="bg-white">
            <View className="px-3 pb-4">
              <Text className="font-bold text-xl pt-2">{title}</Text>
              <View className="flex-row space-x-1 my-1">
                <View className="flex-row items-center  pt-2 space-x-1">
                  <StarIcon size={22} opacity={0.5} color="green" />
                  <Text className="text-gray-500 text-xs">
                    <Text className="text-green-500 ">{rating}</Text>
                    {genre.map((genre, indx) => {
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
                    })}
                  </Text>
                </View>
                <View className="flex-row items-center pt-2 space-x-1">
                  <MapPinIcon size={20} color="gray" opacity={0.4} />
                  <Text className="text-gray-500 text-xs">
                    Nearby . {address}
                  </Text>
                </View>
              </View>
              <Text className="text-gray-500 mt-2 pb-4">
                {short_description}
              </Text>
            </View>
          </View>
        </View>

        <View>
          <Text className="text-xl font-bold pt-6 px-4 mb-3"> Menu</Text>
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              image={dish.image}
              price={dish.price}
              short_description={dish.short_description}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
