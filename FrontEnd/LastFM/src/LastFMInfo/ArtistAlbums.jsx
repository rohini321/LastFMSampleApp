// ArtistAlbums.jsx
import React from 'react';
import './ArtistAlbums.css'; 

const ArtistAlbums = ({ data }) => {
  if (!data?.topalbums?.album) return <div className="no-albums">No albums found for this artist</div>;

  const albums = data.topalbums.album;

  return (
    <div className="albums-container">
      <h2 className="albums-title">Top Albums by {albums[0]?.artist?.name || 'this artist'}</h2>
      
      <div className="albums-grid">
        {albums.map((album) => {
          const image = album.image.find(img => img.size === 'large')?.['#text'] || 
                       album.image.find(img => img.size === 'medium')?.['#text'] || 
                       album.image[0]?.['#text'];
          
          return (
            <div key={album.mbid || album.name} className="album-card">
              {image && (
                <img 
                  src={image} 
                  alt={album.name} 
                  className="album-cover"
                />
              )}
              <div className="album-info">
                <h3 className="album-name">{album.name}</h3>
                <p className="album-plays">{parseInt(album.playcount).toLocaleString()} plays</p>
                <a 
                  href={album.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="album-link"
                >
                  View on Last.fm
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArtistAlbums;