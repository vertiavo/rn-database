import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  async componentDidMount() {
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?%20%E2%86%B5%20sort_by=popularity.desc?&api_key=`
      );
      let responseJson = await response.json();
      this.setState(
        {
          isLoading: false,
          dataSource: responseJson.results
        },
        function() {}
      );
    } catch (error) {
      console.error(error);
    }
  }

  onPress(item) {
    this.props.navigation.navigate("Details", { id: item.id });
  }

  renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={this.onPress.bind(this, item)}>
              <View style={styles.movieRow}>
                <View style={styles.movieBasicInfo}>
                  {/* Title and desc */}
                  <Text style={styles.movieBasicInfoText}>{item.title}</Text>
                  <Text>{item.overview}</Text>
                </View>
                <View style={styles.movieReleaseDate}>
                  {/* Release date */}
                  <Text>{item.release_date}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={({ id }, index) => id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10
  },
  separator: {
    height: 1,
    width: "90%",
    backgroundColor: "#CED0CE",
    marginTop: "5%",
    marginBottom: "5%",
    marginLeft: "5%",
    marginRight: "5%"
  },
  movieRow: {
    flex: 10,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  movieBasicInfo: {
    flex: 8
  },
  movieBasicInfoText: {
    fontSize: 30,
    fontWeight: "bold"
  },
  movieReleaseDate: {
    flex: 2
  }
});
