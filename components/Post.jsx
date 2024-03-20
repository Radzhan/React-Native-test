import styled from "styled-components/native";

const PostView = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-style: solid;
`;

const PostImage = styled.Image`
  width: 66px;
  height: 66px;
  border-radius: 12px;
  margin-right: 12px;
`;

const PostDetails = styled.View`
    flex: 1;
`;

const PostTitle = styled.Text`
  font-size: 17px;
  font-weight: 700;
`;

const PostDate = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  margin-top: 2px;
`;

const truncateTitle = (str) => {
    if (str.length >= 50) {
        return str.substring(0, 50) + ' ...';
    }

    return str;
}

export const Post = ({title, image, date}) => {
  return (
    <PostView>
      <PostImage
        source={{
          uri: image,
        }}
      />
      <PostDetails>
        <PostTitle>{truncateTitle(title)}</PostTitle>
        <PostDate>{date}</PostDate>
      </PostDetails>
    </PostView>
  );
};
