import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import {
  fetchCategoriesAsync,
  selectCategories,
} from "../features/categories/categorySlice";
import { useAppDispatch, useAppSelector } from "../store/store.hooks";

export default function TabTwoScreen() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  React.useEffect(() => {
    const getCategoriesPromise = dispatch(fetchCategoriesAsync());
    return () => {
      getCategoriesPromise.abort();
    };
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catalog</Text>
      {categories.map((el, i) => (
        <Text key={i}>{el}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
