import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, ResponseSearch } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  public giftList: Gif[] = [];

  private _taxHistory: string[] = [];
  private apiKey: string = "9esdrr2Dn8sHhcSvqfyn0drDDz6CkGJz";
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs service Ready');
   }


  get tagsHistory(){
    return [...this._taxHistory];
  }

  private organizeHistory(tag:string){
    tag = tag.toLowerCase();

    if(this._taxHistory.includes(tag)){
      this._taxHistory = this._taxHistory.filter( (oldTag) => oldTag !== tag);
    }
    this._taxHistory.unshift(tag);
    this._taxHistory = this.tagsHistory.slice(0,10);
    this.saveLocalSrorage();
  }

  private saveLocalSrorage():void{
      const temporal = localStorage.setItem('history', JSON.stringify(this._taxHistory));
  }

  private loadLocalStorage() :void{
    if(!localStorage.getItem('history') ) return;
    this._taxHistory = JSON.parse(localStorage.getItem('history')!);
    if(this._taxHistory.length === 0) return;
    this.searchTag(this._taxHistory[0]);
  }


  //async searchTag(tag:string):Promise<void>{
  searchTag(tag:string):void{
    if( tag.length === 0 ) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', tag)

    this.http.get<ResponseSearch>(`${this.serviceUrl}/search?`,{params : params})
      .subscribe( resp => {

        this.giftList = resp.data
          console.log({gifs: this.giftList});
      });

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=9esdrr2Dn8sHhcSvqfyn0drDDz6CkGJz&q=valorant&limit=10')
    // .then(resp => resp.json())
    // .then(data => console.log(data))
  }




}
