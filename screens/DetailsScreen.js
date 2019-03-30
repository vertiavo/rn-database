import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
    const { navigation } = this.props;
    this.movieId = navigation.getParam("id", "");
  }

  async componentDidMount() {
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=`
      );
      let responseJson = await response.json();
      this.setState(
        {
          isLoading: false,
          dataSource: responseJson
        },
        function() {}
      );
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    let movie = this.state.dataSource;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.propertyRow}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
          </View>

          <View style={styles.propertyRow}>
            <View style={styles.propertyLabel}>
              <Text style={styles.labelText}>Overview</Text>
            </View>
            <View style={styles.propertyValue}>
              <Text>{movie.overview}</Text>
            </View>
          </View>

          <View style={styles.propertyRow}>
            <View style={styles.propertyLabel}>
              <Text style={styles.labelText}>Release date</Text>
            </View>
            <View style={styles.propertyValue}>
              <Text>{movie.release_date}</Text>
            </View>
          </View>

          <View style={styles.propertyRow}>
            <View style={styles.propertyLabel}>
              <Text style={styles.labelText}>Vote average</Text>
            </View>
            <View style={styles.propertyValue}>
              <Text>{movie.vote_average}</Text>
            </View>
          </View>

          <View style={styles.propertyRow}>
            <View style={styles.propertyLabel}>
              <Text style={styles.labelText}>Budget</Text>
            </View>
            <View style={styles.propertyValue}>
              <Text>$ {movie.budget}</Text>
            </View>
          </View>

          <View style={styles.propertyRow}>
            <View style={styles.propertyLabel}>
              <Text style={styles.labelText}>Revenue</Text>
            </View>
            <View style={styles.propertyValue}>
              <Text>$ {movie.revenue}</Text>
            </View>
          </View>

          <View style={styles.propertyRow}>
            <View style={styles.propertyLabel}>
              <Text style={styles.labelText}>Adult</Text>
            </View>
            <View style={styles.propertyValue}>
              <Text>{JSON.stringify(movie.adult)}</Text>
            </View>
          </View>

          <View style={styles.propertyRow}>
            <View style={styles.propertyLabel}>
              <Text style={styles.labelText}>Homepage</Text>
            </View>
            <View style={styles.propertyValue}>
              <Text>{movie.homepage}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  propertyRow: {
    flex: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10
  },
  propertyLabel: {
    flex: 2
  },
  propertyValue: {
    flex: 8
  },
  movieTitle: {
    fontSize: 30,
    fontWeight: "bold"
  },
  labelText: {
    fontWeight: "bold"
  }
});
