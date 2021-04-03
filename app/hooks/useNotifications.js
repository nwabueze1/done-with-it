import React from "react";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import expoPusTokensApi from "../api/expoPushTokens";
import { Alert } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
const useNotifications = (notificationListener) => {
  React.useEffect(() => {
    registerForPushNotifications();
    if (notificationListener)
      Notifications.addPushTokenListener(notificationListener);
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const { granted } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!granted)
        return Alert.alert(
          "Permission",
          "Sorry, You need to require permission to access this"
        );

      const token = await Notifications.getExpoPushTokenAsync();
      expoPusTokensApi.register(token);
    } catch (error) {
      console.log("Error getting a push token", error);
    }
  };
};

export default useNotifications;
