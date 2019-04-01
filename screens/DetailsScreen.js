import React, { Component } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  ToastAndroid,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import firebase from "react-native-firebase";

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      movie: {}
    };

    const { navigation } = this.props;
    movieId = navigation.getParam("id", "");

    this.ref = firebase
      .firestore()
      .collection("movies")
      .doc(movieId);
  }

  static navigationOptions = {
    title: "Details"
  };

  async componentDidMount() {
    let doc = await this.ref.get();
    const {
      title,
      overview,
      release_date,
      vote_average,
      budget,
      revenue,
      adult,
      homepage
    } = await doc.data();

    let movie = {
      key: doc.id,
      doc,
      title,
      overview,
      release_date,
      vote_average,
      budget,
      revenue,
      adult,
      homepage
    };

    this.setState({
      movie,
      isLoading: false
    });
  }

  async onDelete() {
    try {
      await firebase
        .firestore()
        .collection("movies")
        .doc(movieId)
        .delete();
      ToastAndroid.showWithGravity(
        "Movie deleted, press Back to return to the list.",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
    } catch (error) {
      console.error("Error during deleting item: ", error);
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

    let movie = this.state.movie;

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
        <View style={styles.button}>
          <Button
            title="Edit"
            onPress={() =>
              this.props.navigation.navigate("Input", { id: movieId })
            }
          />
        </View>
        <View style={styles.button}>
          <Button onPress={this.onDelete} title="Delete" />
        </View>
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
  },
  button: {
    padding: 10
  }
});
