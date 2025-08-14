import { useState } from 'react';
import axios from 'axios';
import ArtistInfo from './ArtistInfo';
import ArtistTags from './ArtistTags';
import ArtistAlbums from './ArtistAlbums';

const GetLastFMINFO = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [artistName, setArtistName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleButtonClick = (formType) => {
    setActiveForm(formType);
    setArtistName('');
    setError(null);
    setData(null);
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let url = '';
      if (activeForm === 'artist') {
        url = `https://localhost:7299/api/LastFm/artist/${encodeURIComponent(artistName)}`;
      } else if (activeForm === 'tags') {
        // Removed userId from the URL
        url = `https://localhost:7299/api/LastFm/artist/${encodeURIComponent(artistName)}/user/rohini123`;
      } else if (activeForm === 'albums') {
        url = `https://localhost:7299/api/LastFm/artist/${encodeURIComponent(artistName)}/albums`;
      }

      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!artistName.trim()) {
      setError('Artist name is required');
      return;
    }
    fetchData();
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => handleButtonClick('artist')}
          style={{ marginRight: '10px', fontWeight: activeForm === 'artist' ? 'bold' : 'normal' }}
        >
          Artist Info
        </button>
        <button 
          onClick={() => handleButtonClick('tags')}
          style={{ marginRight: '10px', fontWeight: activeForm === 'tags' ? 'bold' : 'normal' }}
        >
          Artist Tags
        </button>
        <button 
          onClick={() => handleButtonClick('albums')}
          style={{ fontWeight: activeForm === 'albums' ? 'bold' : 'normal' }}
        >
          Artist Albums
        </button>
      </div>

      {activeForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label>
              Artist Name:
              <input
                type="text"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                style={{ marginLeft: '10px', padding: '5px' }}
              />
            </label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: '5px 15px',
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </form>
      )}

      {error && (
        <div style={{ 
          color: 'red', 
          margin: '10px 0', 
          padding: '10px',
          backgroundColor: '#ffebee',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}

      {data && (
        <div style={{ marginTop: '20px' }}>
          {activeForm === 'artist' && <ArtistInfo data={data} />}
          {activeForm === 'tags' && <ArtistTags data={data} />}
          {activeForm === 'albums' && <ArtistAlbums data={data} />}
        </div>
      )}
    </div>
  );
};

export default GetLastFMINFO;