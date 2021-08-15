/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabFourScreen from "../screens/TabFourScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabThreeScreen from "../screens/TabThreeScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { BottomTabParamList, TabFourParamList, TabOneParamList, TabThreeParamList, TabTwoParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="TabOne"
            tabBarOptions={{
                labelPosition: "below-icon",
                activeTintColor: Colors[colorScheme].tint,
                style: {
                    borderTopWidth: 0,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                }
            }}
        >
            <BottomTab.Screen
                name="TabOne"
                component={TabOneNavigator}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ focused, color }) => (
                        <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />
                    )
                }}
            />
            <BottomTab.Screen
                name="TabTwo"
                component={TabTwoNavigator}
                options={{
                    tabBarLabel: "Catalogue",
                    tabBarIcon: ({ focused, color }) => (
                        <TabBarIcon name={focused ? "grid" : "grid-outline"} color={color} />
                    )
                }}
            />
            <BottomTab.Screen
                name="TabThree"
                component={TabThreeNavigator}
                options={{
                    tabBarLabel: "Favorite",
                    tabBarIcon: ({ focused, color }) => (
                        <TabBarIcon name={focused ? "heart" : "heart-outline"} color={color} />
                    )
                }}
            />
            <BottomTab.Screen
                name="TabFour"
                component={TabFourNavigator}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ focused, color }) => (
                        <TabBarIcon name={focused ? "person" : "person-outline"} color={color} />
                    )
                }}
            />
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>["name"]; color: string }) {
    return <Ionicons size={25} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
    return (
        <TabOneStack.Navigator>
            <TabOneStack.Screen name="TabOneScreen" component={TabOneScreen} options={{ headerTitle: "Home" }} />
        </TabOneStack.Navigator>
    );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
    return (
        <TabTwoStack.Navigator>
            <TabTwoStack.Screen
                name="TabTwoScreen"
                component={TabTwoScreen}
                options={{
                    headerTitle: "Clothing",
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: "#4B0082" }
                }}
            />
        </TabTwoStack.Navigator>
    );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
    return (
        <TabThreeStack.Navigator>
            <TabThreeStack.Screen
                name="TabThreeScreen"
                component={TabThreeScreen}
                options={{ headerTitle: "Favorite" }}
            />
        </TabThreeStack.Navigator>
    );
}

const TabFourStack = createStackNavigator<TabFourParamList>();

function TabFourNavigator() {
    return (
        <TabFourStack.Navigator>
            <TabFourStack.Screen name="TabFourScreen" component={TabFourScreen} options={{ headerTitle: "Profile" }} />
        </TabFourStack.Navigator>
    );
}
