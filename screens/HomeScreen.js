import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import {
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import { useLayoutEffect } from "react";
import { ImagesAssets } from "../assets/ImagesAssets";
import {
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRows from "../components/FeaturedRows";
import sanityClient from "../sanity";

const Homescreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setfeaturedCategories] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'featured']{
    ...,
    restaurants[]->{
      ...,
      dishes[]-> 
    },
  }`
      )
      .then((data) => setfeaturedCategories(data));
  }, []);
  return (
    <SafeAreaView className="bg-white pt-7 ">
      {/*header */}
      <View className="flex-row pd-3 items-center mx-4 space-x-2 ">
        <Image
          source={ImagesAssets.DeliveryLogo}
          className="h-7 w-7 bg-gray-300 p-3 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver now</Text>
          <Text className="font-bold text-lg">
            Current location
            <ChevronDownIcon size={20} color="#6ccecd" />
          </Text>
        </View>
        <UserIcon size={35} color="#6ccecd" />
      </View>
      {/* search*/}
      <View className="flex-row items-center space-x-2 pb-2 mx-4 ">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
          <MagnifyingGlassIcon color="gray" size={22} />
          <TextInput
            placeholder="Search for Restaurants and Cuisines  "
            keyboardType="default"
            className="text-xs"
          />
        </View>
        <AdjustmentsVerticalIcon color="#6ccecd" />
      </View>
      {/*Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}>
        {/*Categories */}

        <Categories />
        {/*FeaturedRows */}
        {featuredCategories?.map((category) => (
          <FeaturedRows
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Homescreen;
