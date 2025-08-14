
import React from 'react';
import './ArtistInfo.css'; 

const ArtistInfo = ({ data }) => {
  if (!data?.artist) return <div className="no-data">No artist data found</div>;

  const { artist } = data;
  const largeImage = artist.image.find(img => img.size === 'large')?.['#text'] || artist.image[0]?.['#text'];
  const similarArtists = artist.similar?.artist || [];

  return (
    <div className="artist-info">
      {/* Artist Header Section */}
      <div className="artist-header">
        {largeImage && (
          <img 
            src={largeImage} 
            alt={artist.name} 
            className="artist-image"
          />
        )}
        <div className="artist-meta">
          <h1>{artist.name}</h1>
          <div className="artist-stats">
            {artist.stats?.listeners && (
              <p>Listeners: {parseInt(artist.stats.listeners).toLocaleString()}</p>
            )}
            {artist.stats?.playcount && (
              <p>Plays: {parseInt(artist.stats.playcount).toLocaleString()}</p>
            )}
          </div>
          <a href={artist.url} target="_blank" rel="noopener noreferrer" className="lastfm-link">
            View on Last.fm
          </a>
        </div>
      </div>

      {/* Biography Section */}
      {artist.bio?.summary && (
        <div className="section">
          <h2>About</h2>
          <div 
            className="bio-content" 
            dangerouslySetInnerHTML={{ __html: artist.bio.summary }} 
          />
        </div>
      )}

      {/* Tags Section */}
      {artist.tags?.tag?.length > 0 && (
        <div className="section">
          <h2>Tags</h2>
          <div className="tags">
            {artist.tags.tag.map((tag, index) => (
              <a 
                key={index} 
                href={tag.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="tag"
              >
                {tag.name}
              </a>
            ))}
          </div>
        </div>
      )}

      
      {similarArtists.length > 0 && (
        <div className="section">
          <h2>Similar Artists</h2>
          <div className="similar-artists">
            {similarArtists.map((artist, index) => {
              const artistImage = artist.image.find(img => img.size === 'medium')?.['#text'];
              return (
                <div key={index} className="similar-artist">
                  {artistImage && (
                    <img 
                      src={artistImage} 
                      alt={artist.name} 
                      className="artist-thumbnail"
                    />
                  )}
                  <a 
                    href={artist.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="artist-name"
                  >
                    {artist.name}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistInfo;