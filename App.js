import { createAppContainer, createStackNavigator } from "react-navigation";
import ListScreen from "./screens/ListScreen";
import DetailsScreen from "./screens/DetailsScreen";
import InputScreen from "./screens/InputScreen";

const AppNavigator = createStackNavigator(
  {
    List: {
      screen: ListScreen
    },
    Details: {
      screen: DetailsScreen
    },
    Input: {
      screen: InputScreen
    }
  },
  {
    initialRouteName: "List"
  }
);

export default createAppContainer(AppNavigator);
