import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-cards',
  templateUrl: './gifs-cards.component.html',

})
export class GifsCardsComponent implements OnInit{
[x: string]: any;


  @Input()
  public gif! : Gif;


  ngOnInit(): void {
    if(!this.gif) throw new Error('Gif properties not requerde');
  }
}
