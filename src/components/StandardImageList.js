import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function StandardImageList({itemData}) {
  console.log(itemData)
  return (
    <ImageList cols={3} rowHeight={120}>
      {itemData.map((item) => (
        <ImageListItem key={item.id}>
          <img
            src={`${item.attributes.cover.data.attributes.url}?w=164&h=164&fit=crop&auto=format`}
            alt={item.attributes.cover.data.attributes.alternativeText}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}