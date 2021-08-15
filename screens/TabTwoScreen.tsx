import { Ionicons } from "@expo/vector-icons";
import { Center, Icon, IconButton, Image, ScrollView, Spinner } from "native-base";
import * as React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import SelectableChips from "react-native-chip/SelectableChips";

import { View } from "../components/Themed";
import { fetchCategoriesAsync, selectCategories, selectCategoriesStatus } from "../store/categorySlice";
import { addToFavorites, fetchProductsAsync, IProduct, selectProducts, selectProductsStatus } from "../store/productSlices";
import { useAppDispatch, useAppSelector } from "../store/store.hooks";

export default function TabTwoScreen({ navigation }: any) {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = React.useState<string[]>(["all"]);
  const products: IProduct[] = useAppSelector(selectProducts);
  const categories: string[] = useAppSelector(selectCategories);
  const isProductsLoading = useAppSelector(selectProductsStatus);
  const isCategoriesLoading = useAppSelector(selectCategoriesStatus);

  const filteredProducts: IProduct[] = products.filter((product: IProduct) => {
    if (filter.includes(product.category) || filter.includes("all"))
      return product;
  });

  React.useEffect(() => {
    const getCategoriesPromise = dispatch(fetchCategoriesAsync());
    const getProductsPromise = dispatch(fetchProductsAsync());
    return () => {
      getCategoriesPromise.abort();
      getProductsPromise.abort();
    };
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {isCategoriesLoading === "loading" ? (
        <View style={styles.emptyList}>
          <Spinner color="indigo" size="sm" accessibilityLabel="Loading Categories" />
        </View>
      ) : categories.length !== 0 ? (
        <View style={styles.categories}>
          <ScrollView horizontal={true}>
            <SelectableChips
              alertRequired={false}
              chipStyle={styles.badge}
              initialChips={categories}
              valueStyle={styles.badgeValue}
              valueStyleSelected={styles.badgeValueSelected}
              onChangeChips={(chips: any) => setFilter([...chips])}
            />
          </ScrollView>
        </View>
      ) : (
        <View style={styles.emptyList}>
          <Center>Empty Categories List</Center>
        </View>
      )}
      {isProductsLoading === "loading" ? (
        <View style={styles.emptyList}>
          <Spinner color="indigo" size="sm" accessibilityLabel="Loading Producst" />
        </View>
      ) : filteredProducts.length !== 0 ? (
        <View style={styles.products}>
          <Text style={styles.productsLengthText}>
            {filteredProducts.length} items
          </Text>
          <ScrollView>
            <FlatList
              numColumns={2}
              horizontal={false}
              data={filteredProducts}
              contentContainerStyle={{ paddingVertical: 10 }}
              renderItem={({ item }) => (
                <View key={item.id} style={styles.prdouct}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Product', { title: item.title, price: item.price })}
                  >
                    <Image
                      alt={item.title}
                      style={styles.productImage}
                      source={{ uri: item.image }}
                    />
                    <IconButton
                      size="sm"
                      variant="solid"
                      style={styles.iconButton}
                      onPress={() =>
                        dispatch(
                          addToFavorites({
                            id: item.id,
                            favorite: !item.favorite,
                          })
                        )
                      }
                      icon={
                        <Icon
                          size="sm"
                          as={Ionicons}
                          color="indigo"
                          name={item.favorite ? "heart" : "heart-outline"}
                        />
                      }
                    />
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <Text style={styles.productPrice}>${item.price}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </ScrollView>
        </View>
      ) : (
        <View style={styles.emptyList}>
          <Center>No Filter is selected</Center>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "smokewhite",
  },
  categories: {
    height: 50,
    backgroundColor: "smokewhite",
  },
  badge: {
    borderWidth: 0,
    borderColor: "none",
    backgroundColor: "transparent",
  },
  badgeValue: {
    fontSize: 15,
    paddingTop: 0,
    color: "black",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 0,
    borderRadius: 25,
    backgroundColor: "white",
  },
  badgeValueSelected: {
    fontSize: 15,
    paddingTop: 0,
    color: "white",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 0,
    borderRadius: 25,
    backgroundColor: "orange",
  },
  products: {
    flex: 1,
    marginVertical: 10,
    backgroundColor: "smokewhite",
  },
  productsLengthText: {
    fontWeight: "900",
    marginHorizontal: 5,
  },
  prdouct: {
    flex: 1,
    padding: 5,
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: "white",
  },
  iconButton: {
    top: -15,
    right: 10,
    width: "20%",
    shadowRadius: 3,
    borderRadius: 50,
    alignSelf: "flex-end",
    backgroundColor: "white",
  },
  productImage: {
    height: 140,
    width: "100%",
  },
  productTitle: {
    fontSize: 13,
    fontWeight: "400",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "800",
    marginVertical: 10,
  },
  emptyList: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "smokewhite",
  },
});
