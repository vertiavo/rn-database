import { createAppContainer, createStackNavigator } from "react-navigation";
import ListScreen from "./screens/ListScreen";
import DetailsScreen from "./screens/DetailsScreen";

const AppNavigator = createStackNavigator(
  {
    List: {
      screen: ListScreen
    },
    Details: {
      screen: DetailsScreen
    }
  },
  {
    initialRouteName: "List"
  }
);

export default createAppContainer(AppNavigator);
