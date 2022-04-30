import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';



export default function StandardImageList({itemData}) {
  console.log(itemData)

  



  return (
    <ImageList cols={3} rowHeight={120}>
      {itemData.map((item) => (
        <ImageListItem component={Link} to={`/progress/${item.id}`} key={item.id}>
          <img
            src={`${item.attributes.cover.data.attributes.url}?w=164&h=164&fit=crop&auto=format`}
            alt={item.attributes.cover.data.attributes.alternativeText}
            loading="lazy"
          />
          <ImageListItemBar
            title={new Date(`${item.attributes.createdAt}`).getDate() + ' ' + new Date(`${item.attributes.createdAt}`).toLocaleString('default', {month: 'short'})}
            subtitle={item.author}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}