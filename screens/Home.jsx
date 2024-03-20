import {
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Post } from "../components/Post";
import { Loading } from "../components/Loading";

export const Home = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPhotos = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
      setItems(response.data);
    } catch (error) {
      console.error(error);
      alert("Ошибка при получении статей");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getPhotos();
  }, [getPhotos]);

  if (isLoading) {
    return (
      <Loading/>
    );
  }

  return (
    <View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getPhotos} />
        }
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('FullPost', {id: item.id})}>
            <Post title={item.title} image={item.url} date={item.id} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
