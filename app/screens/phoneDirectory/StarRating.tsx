import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as CONST from '../../utils/Constants';

interface StarRatingProps {
  rating: number;
  maxStars: number;
  starSize: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars, starSize }) => {
  const renderStar = (index: number) => {
    const isFilled = index <= rating;
    const starImageSource = isFilled
      ? CONST.STAR_SELECT // Replace with the path to your star-filled image
      : CONST.STAR_NORMAL; // Replace with the path to your star-empty image

    return <Image source={starImageSource} style={{ width: starSize, height: starSize }} />;
  };

  return (
    <View style={styles.starRatingContainer}>
      {Array.from({ length: maxStars }, (_, index) => renderStar(index + 1))}
    </View>
  );
};

const styles = StyleSheet.create({
  starRatingContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default StarRating;
