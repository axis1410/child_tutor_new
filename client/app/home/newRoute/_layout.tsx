import { Stack } from "expo-router";

export default function CourseLayout() {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ title: "Learn" }} />
    </Stack>
  );
}
