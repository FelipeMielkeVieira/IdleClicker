import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mundo1',
  templateUrl: './mundo1.component.html',
  styleUrls: ['./mundo1.component.css']
})
export class Mundo1Component implements OnInit {

  constructor() { }

  mps = 0;
  moedas = 0;
  click = 1;

  custoClicar = 10;
  custoMps = 100;

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

  compra(numero) {
    if(numero == 1) {
      if(this.moedas >= this.custoMps) {
        this.moedas -= this.custoMps;
        this.mps += 1;
        this.custoMps += 15;
      }
    } else {
      if(this.moedas >= this.custoClicar) {
        this.moedas -= this.custoClicar;
        this.click += 1;
        this.custoClicar += 9;
      }
    }
  }

  clicar() {
    this.moedas += this.click
  }
}
