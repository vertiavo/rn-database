import React, { Component } from "react";
import {
  ActivityIndicator,
  Button,
  CheckBox,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import firebase from "react-native-firebase";

export default class InputScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      movie: {
        title: "",
        overview: "",
        release_date: "",
        vote_average: 5.0,
        budget: 1,
        revenue: 1,
        adult: false,
        homepage: ""
      }
    };

    const { navigation } = this.props;
    movieId = navigation.getParam("id", "NO-ID");

    this.ref = firebase
      .firestore()
      .collection("movies")
      .doc(movieId);
  }

  static navigationOptions = {
    title: "Enter movie values"
  };

  async componentDidMount() {
    if (movieId !== "NO-ID") {
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
    } else {
      this.setState({ isLoading: false });
    }
  }

  async onSave(movie, navigation) {
    if (movieId === "NO-ID") {
      try {
        await firebase
          .firestore()
          .collection("movies")
          .add(movie);
        ToastAndroid.showWithGravity(
          "Movie successfully added.",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        navigation.goBack();
      } catch (error) {
        console.error("Error during saving movie: ", error);
      }
    } else {
      try {
        await firebase
          .firestore()
          .collection("movies")
          .doc(movieId)
          .update(movie);
        ToastAndroid.showWithGravity(
          "Movie successfully updated.",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        navigation.goBack();
      } catch (error) {
        console.error("Error during updating movie: ", error);
      }
    }
  }

  onAdultPressed() {
    let newAdultValue = !this.state.movie.adult;
    this.setState({ movie: { ...this.state.movie, adult: newAdultValue } });
  }

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
        <ScrollView>
          <View style={styles.propertyRow}>
            <View style={styles.propertyLabel}>
              <Text style={styles.labelText}>Title</Text>
            </View>
            <View style={styles.propertyValue}>
              <TextInput
                placeholder="Title"
                value={this.state.movie.title}
                onChangeText={title =>
                  this.setState({ movie: { ...this.state.movie, title } })
                }
              />
            </View>
          </View>

          <View style={styles.propertyRow}>
            <View style={styles.propertyLabel}>
              <Text style={styles.labelText}>Overview</Text>
            </View>
            <View style={styles.propertyValue}>
              <TextInput
                placeholder="Overview"
                value={this.state.movie.overview}
                onChangeText={overview =>
                  this.setState({ movie: { ...this.state.movie, overview } })
                }
              />
            </View>
          </View>

          <View style={styles.propertyRow}>
            <View style={styles.propertyLabel}>
              <Text style={styles.labelText}>Release date</Text>
            </View>
            <View style={styles.propertyValue}>
              <TextInput
                placeholder="Release date (eg. YYYY-MM-DD)"
                value={this.state.movie.release_date}
                onChangeText={release_date =>
                  this.setState({
                    movie: { ...this.state.movie, release_date }
                  })
                }
              />
            </View>
          </View>

          <View style={styles.propertyRow}>
            <View style={styles.propertyLabel}>
              <Text style={styles.labelText}>Vote average</Text>
            </View>
            <View style={styles.propertyValue}>
              <TextInput
                placeholder="Vote average"
                value={this.state.movie.vote_average}
                onChangeText={vote_average =>
                  this.setState({
                    movie: { ...this.state.movie, vote_average }
                  })
                }
              />
            </View>
          </View>

          <View style={styles.propertyRow}>
            <View style={styles.propertyLabel}>
              <Text style={styles.labelText}>Budget ($)</Text>
            </View>
            <View style={styles.propertyValue}>
              <TextInput
                placeholder="Budget"
                value={this.state.movie.budget}
                onChangeText={budget =>
                  this.setState({ movie: { ...this.state.movie, budget } })
                }
              />
            </View>
          </View>

          <View style={styles.propertyRow}>
            <View style={styles.propertyLabel}>
              <Text style={styles.labelText}>Revenue</Text>
            </View>
            <View style={styles.propertyValue}>
              <TextInput
                placeholder="Revenue"
                value={this.state.movie.revenue}
                onChangeText={revenue =>
                  this.setState({ movie: { ...this.state.movie, revenue } })
                }
              />
            </View>
          </View>

          <View style={styles.propertyRow}>
            <CheckBox
              center
              title="Adult"
              checked={this.state.movie.adult}
              onPress={this.onAdultPressed}
            />
          </View>

          <View style={styles.propertyRow}>
            <View style={styles.propertyLabel}>
              <Text style={styles.labelText}>Homepage</Text>
            </View>
            <View style={styles.propertyValue}>
              <TextInput
                placeholder="Homepage"
                value={this.state.movie.homepage}
                onChangeText={homepage =>
                  this.setState({ movie: { ...this.state.movie, homepage } })
                }
              />
            </View>
          </View>
        </ScrollView>
        <Button
          onPress={this.onSave.bind(
            this,
            this.state.movie,
            this.props.navigation
          )}
          title="Save"
        />
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
