import { Text, ScrollView, Image, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "components/FormField";
import CustomButton from "components/CustomButtton";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submet = () => {};
  return (
    <SafeAreaView className="bg-primary h-full pl-4">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px] mt-10"
          />
          <Text className="text-2xl text-buttonStrong font-psemibold mt-10 text-right mr-5">
            تسجيل الدخول
          </Text>
          <FormField
            title="البريد الالكتروني"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder="ادخل البريد الالكتروني الخاص بك"
          />
          <FormField
            title="كلمة السر"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            placeholder="ادخل كلمة السر"
          />
          <CustomButton
            title="تسجيل الدخول"
            handlePress={submet}
            ContainerStyles="mt-7 mr-4"
            isLoading={isSubmitting}
            textStyles=""
          />
          <View className="justify-center pt-5 flex-row gap-2 mr-4">
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-buttonLight mt-0.5"
            >
              اضغط هنا
            </Link>
            <Text className="text-xl text-gray-500 font-pregular">
              ما عندك حساب؟
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
