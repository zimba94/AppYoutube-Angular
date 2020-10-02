import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

//AIzaSyAMzAQ6yv72SEyYJYgRAPSvVRkKav4U29Y   apiKey Youtube
//UUlnc1ZILt_sR1mXqBnmU6hA     uploads-playlist últimos videos subidoss
  private youtubeUrl     = "https://www.googleapis.com/youtube/v3";
  private apikey         = "AIzaSyAMzAQ6yv72SEyYJYgRAPSvVRkKav4U29Y";
  private palylist       = "UUlnc1ZILt_sR1mXqBnmU6hA";
  private nextPageToken  = "";

  constructor(private http: HttpClient) { 
  }

  getVideos(){
    const url = `${this.youtubeUrl}/playlistItems`;
    const params= new HttpParams()
                    .set('part', 'snippet')
                    .set('maxResults', '4')
                    .set('playlistId',this.palylist)
                    .set('key', this.apikey)
                    .set('pageToken', this.nextPageToken)
    return this.http.get<YoutubeResponse>(url, { params })
                    .pipe(
                      map( resp => {
                        this.nextPageToken = resp.nextPageToken;
                        return resp.items;
                      }),
                      map( items => items.map(video => video.snippet))
                    );
  }
}
