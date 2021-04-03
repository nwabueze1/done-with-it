import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "http://172.18.45.97:2000/api",
  },
  staging: {
    apiUrl: "http://172.18.45.97:2000/api",
  },
  prod: {
    apiUrl: "http://172.18.45.97:2000/api",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;

  return settings.prod;
};
export default getCurrentSettings();
