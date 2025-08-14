
using Universe.Lastfm.Api.Models.Req;

namespace LastFMWebAPI.Repository
{
    public class LastFMRepo : ILastFMRepo
    {
        GetAlbumWikiRequest albumReq=new GetAlbumWikiRequest();
        
        public dynamic GetAllArtists()
        {
            var data = albumReq.Album;
            return data;
        }

        public dynamic GetAllTags(string userId,string album, string artistName)
        {
           
            GetAlbumTagsRequest tagsReq=new GetAlbumTagsRequest();
            var tagsList=new List<string>();
           tagsReq= GetAlbumTagsRequest.Build(artistName, album, userId);
            tagsList.Add(tagsReq.Performer);
            tagsList.Add(tagsReq.Album);
            tagsList.Add(tagsReq.User);
            tagsReq.Autocorrect = "1";
            return tagsList;
            
        }
    }
}
