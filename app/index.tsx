import { Image, Text, View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButtton from "components/CustomButtton";
import "nativewind";
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";

// Registering the root component for Expo Router
registerRootComponent(ExpoRoot);

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full items-center justify-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-buttonStrong font-bold text-center">
              اكتشف آفاقًا جديدة لصحة أسنانك مع تطبيق
              <Text className="text-navColor"> Sen</Text>
            </Text>
          </View>
          <Text className="text-sm font-pregular text-gray-500 mt-7 text-center">
            مكان يلتقي فيه الابتكار بصحة أسنانك: العناية اللامحدودة مع سن
          </Text>
          <CustomButtton
            title="المواصلة بالبريد الالكتروني"
            handlePress={() => router.push("/sign-in")}
            ContainerStyles="w-full mt-7"
            textStyles={""}
            isLoading={false}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#F6F4F0" style="dark" />
    </SafeAreaView>
  );
}
