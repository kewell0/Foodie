import { View, Text } from "react-native";
import React from "react";
import Button from "@/src/components/Button";
import { supabase } from "@/src/lib/supabase";

const ProfileScreen = () => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button
        text="Sign out"
        onPress={async () => await supabase.auth.signOut()}
      />
    </View>
  );
};

export default ProfileScreen;
