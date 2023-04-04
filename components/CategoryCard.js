import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ImagesAssets } from "../assets/ImagesAssets";
import { SafeAreaView } from "react-native-safe-area-context";

const CategoryCard = ({ title, imgUrl }) => {
  return (
    <TouchableOpacity className="relative mr-2 h-24 w-24">
      <Image className="h-24 w-24 rounded " source={{ uri: imgUrl }} />
      <View
        className="absolute bg-gray-700 opacity-25 w-24 h-24
      "></View>
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
