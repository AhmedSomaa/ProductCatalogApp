import { Ionicons } from "@expo/vector-icons";
import { Icon, IconButton, VStack } from "native-base";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ProductScreen({ navigation, route }: any) {
    const { title, price } = route.params;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    size="sm"
                    onPress={() => navigation.navigate("TabTwo")}
                    icon={<Icon as={Ionicons} name="arrow-back-outline" color="white" size="sm" />}
                />
            </View>
            <View style={styles.productInfo}>
                <VStack space={2}>
                    <Text style={styles.productTitle}>{title}</Text>
                    <Text style={styles.productPrice}>${price}</Text>
                </VStack>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 56,
        width: "100%",
        flexDirection: "row",
        backgroundColor: "indigo"
    },
    productInfo: {
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    productTitle: {
        fontSize: 15,
        fontWeight: "300"
    },
    productPrice: {
        fontSize: 15,
        fontWeight: "900"
    }
});
