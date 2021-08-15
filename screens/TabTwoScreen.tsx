import { Box, HStack, ScrollView, Spinner } from "native-base";
import * as React from "react";
import { StyleSheet, Text } from "react-native";
import SelectableChips from 'react-native-chip/SelectableChips';

import { View } from "../components/Themed";
import { fetchCategoriesAsync, selectCategories, selectCategoriesStatus } from "../store/categorySlice";
import { useAppDispatch, useAppSelector } from "../store/store.hooks";

export default function TabTwoScreen() {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = React.useState(["all"]);
  const categories = useAppSelector(selectCategories);
  const isLoading = useAppSelector(selectCategoriesStatus);

  React.useEffect(() => {
    const getCategoriesPromise = dispatch(fetchCategoriesAsync());
    return () => {
      getCategoriesPromise.abort();
    };
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {isLoading === "loading" ? (
        <Spinner size="sm" accessibilityLabel="Loading Categories" />
      ) : (
        <View style={{ height: 50, backgroundColor: "smokewhite" }}>
          <ScrollView horizontal={true}>
            <SelectableChips
              alertRequired={false}
              initialChips={categories}
              chipStyle={styles.badge}
              valueStyle={styles.badgeValue}
              valueStyleSelected={styles.badgeValueSelected}
              onChangeChips={(chips: any) => setFilter([...chips])}
            />
          </ScrollView>
        </View>
      )
      }
      <View style={styles.products}>
        <Text>
          {filter.join("-")}
        </Text>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "smokewhite",
  },
  badge: {
    borderWidth: 0,
    borderColor: 'none',
    backgroundColor: "transparent"
  },
  badgeValue: {
    padding: 5,
    fontSize: 15,
    color: "black",
    borderRadius: 10,
    backgroundColor: "white"
  },
  badgeValueSelected: {
    padding: 5,
    fontSize: 15,
    color: "white",
    borderRadius: 10,
    backgroundColor: "orange"
  },
  products: {
    padding: 5,
    flexGrow: 1,
    backgroundColor: "whitesmoke",
  }
});
