import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mundo1',
  templateUrl: './mundo1.component.html',
  styleUrls: ['./mundo1.component.css']
})
export class Mundo1Component implements OnInit {

  constructor() { }

  mps = 1;
  moedas = 0;

  ngOnInit() {
    this.moedasPorSegundo();
  }

  moedasPorSegundo() {

    var self = this;
    setTimeout(function() {
      self.moedas += self.mps;
      self.moedasPorSegundo();
    }, 1000)
  }
}
