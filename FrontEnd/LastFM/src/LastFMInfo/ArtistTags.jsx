
import React from 'react';
import './ArtistTags.css'; 
const ArtistTags = ({ data }) => {
  if (!data?.tags?.tag) return <div className="no-tags">No tags found for this artist</div>;

  const { tag } = data.tags;

  return (
    <div className="tags-container">
      <h2 className="tags-title">Tags for {data.tags['@attr']?.artist || 'this artist'}</h2>
      
      <div className="tags-list">
        {tag.map((t, index) => (
          <a 
            key={index} 
            href={t.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="tag-item"
          >
            {t.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ArtistTags;