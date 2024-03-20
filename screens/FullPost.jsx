import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import styled from "styled-components/native";
import { Loading } from "../components/Loading";

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`;
const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;

export const FullPost = ({ route, navigation }) => {
  const [data, setData] = useState();
  const {id} = route.params;
  const [isLoading, setIsLoading] = useState(true);

  const getPhoto = useCallback(async () => {
    navigation.setOptions({
      title: 'Статья ' + id
    })
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/photos/" + id
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
      alert("Ошибка при получении статьи");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getPhoto();
  }, [getPhoto]);

  if (isLoading) {
    return (
      <Loading/>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <PostImage source={{ uri: data.url }} />
      <PostText>
        {data.title}
      </PostText>
    </View>
  );
};
