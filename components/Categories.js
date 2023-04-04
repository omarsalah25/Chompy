import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import sanityClient, { urlFor } from "../sanity";

import { ImagesAssets } from "../assets/ImagesAssets";

const Categories = () => {
  const [categories, setcategories] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(`*[_type == 'category' ]`)
      .then((data) => setcategories(data));
  }, []);
  return (
    <ScrollView
      horizontal
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      showsHorizontalScrollIndicator={false}>
      {/*CategoriesCards */}
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).url()}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
