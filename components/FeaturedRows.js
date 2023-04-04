import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../sanity";

const FeaturedRows = ({ title, description, id }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'featured' && _id==$id]{
          ...,
          restaurants[]->{
            ...,
            dishes[]->,
            type[]->{
              name
            } 
          },
        }[0]`,
        { id }
      )
      .then((data) => setRestaurants(data?.restaurants));
  }, [id]);
  console.log(restaurants);
  return (
    <View>
      <View className="mt-4 flex-row justify-between items-center px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#6ccecd" />
      </View>
      <Text className="text-xs px-4 text-gray-500">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4 ">
        {/* RestaurantCard  */}
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            rating={restaurant.rating}
            imgUrl={restaurant.image}
            title={restaurant.name}
            genre={restaurant.type}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRows;
