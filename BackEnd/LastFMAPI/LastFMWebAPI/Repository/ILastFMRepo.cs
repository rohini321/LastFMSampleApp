namespace LastFMWebAPI.Repository
{
    public interface ILastFMRepo
    {
        public dynamic GetAllArtists();
        public dynamic GetAllTags(string userId,string album, string artistName);
    }
}
