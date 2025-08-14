

using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Web;
using System.Text.Json;
using Microsoft.AspNetCore.Http;

[ApiController]
[Route("api/[controller]")]
public class LastFmController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly string _apiKey;
    private const string _baseUrl = "http://ws.audioscrobbler.com/2.0/";

    public LastFmController(IHttpClientFactory httpClientFactory, IConfiguration config)
    {
        _httpClientFactory = httpClientFactory;
        _apiKey = config["Lastfm:ApiKey"];
    }

    //Getting Artist details by specifying their names
    [HttpGet("artist/{artistName}")]
    public async Task<IActionResult> GetArtistInfo(string artistName)
    {
        var client = _httpClientFactory.CreateClient();
        string reqURL = $"{_baseUrl}?" +
                $"method=artist.getInfo&" +
                $"api_key={_apiKey}&" +
                $"artist={WebUtility.UrlEncode(artistName)}&" + 
                $"format=json&" + 
                $"autocorrect=1";
        var response = await client.GetAsync(reqURL);
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        var json = JsonDocument.Parse(content).RootElement;

        return Ok(json);
       
    }

     //2. Get Artist Tags
    [HttpGet("artist/{artistName}/user/{userName}")]
    public async Task<IActionResult> GetArtistTags(string artistName,string userName)
    {
        var client = _httpClientFactory.CreateClient();
        string reqURL = $"{_baseUrl}?" +
                $"method=artist.getTags&" +
                $"api_key={_apiKey}&" +
                $"artist={WebUtility.UrlEncode(artistName)}&" +
                $"user={WebUtility.UrlEncode(userName)}&"+
                $"format=json&" +
                $"autocorrect=1";
        var response = await client.GetAsync(reqURL);
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        var json = JsonDocument.Parse(content).RootElement;

        return Ok(json);
    }

    // 3. Get Artist Albums
    [HttpGet("artist/{artistName}/albums")]
    public async Task<IActionResult> GetArtistAlbums(string artistName)
    {
        var client = _httpClientFactory.CreateClient();
        string reqURL = $"{_baseUrl}?" +
                $"method=artist.getTopAlbums&" +
                $"api_key={_apiKey}&" +
                $"artist={WebUtility.UrlEncode(artistName)}&" +
                $"format=json&" +
                $"autocorrect=1";
        var response = await client.GetAsync(reqURL);
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        var json = JsonDocument.Parse(content).RootElement;

        return Ok(json);

    }
}