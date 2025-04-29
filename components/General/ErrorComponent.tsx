// import React from "react";
// import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

// interface IProps {
//   message?: string;
//   onRetry?: () => void;
// }

// const ErrorComponent = ({ message, onRetry }: IProps) => {
//   return (
//     <View style={styles.container}>
//       <Image
//         source={{
//           uri: "https://cdn-icons-png.flaticon.com/512/1179/1179123.png",
//         }}
//         style={styles.errorImage}
//       />
//       <Text style={styles.errorTitle}>Something Went Wrong</Text>
//       <Text style={styles.errorMessage}>
//         {message || "An unexpected error occurred. Please try again."}
//       </Text>
//       {onRetry && (
//         <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
//           <Text style={styles.retryText}>Retry</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#f8f9fa",
//   },
//   errorImage: {
//     width: 150,
//     height: 150,
//     marginBottom: 20,
//   },
//   errorTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 10,
//   },
//   errorMessage: {
//     fontSize: 16,
//     color: "#555",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   retryButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: "#007bff",
//     borderRadius: 5,
//   },
//   retryText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

// export default ErrorComponent;

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

const ErrorComponent = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle" size={25} color="#D9534F" />
      <Text style={styles.errorMessage}>
        {"Something went wrong. Please try again."}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 8,
    padding: 12,
    margin: 10,
    gap: 6,
    borderColor: "#e0e0e0",
  },
  errorImage: {
    width: 24,
    height: 24,
    marginRight: 10,
    tintColor: "#6c757d", // Neutral tint for the icon
  },
  errorMessage: {
    fontSize: 14,
    color: "#6c757d", // Neutral text color
    fontWeight: "500",
  },
});

export default ErrorComponent;
