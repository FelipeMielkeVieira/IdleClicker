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

  aumentoMps = 1;
  aumentoClick = 1;

  //cursor, tecla, barra de espaço, ctrl, shift
  listaItens = [0, 0, 0, 0, 0]
  listaCustoItens = [20, 200, 1260, 7560, 34920]
  multiplicadorItens = [1, 1, 1, 1, 1];

  ngOnInit() {
    this.moedasPorSegundo();
  }

  getMoedas() {
    return Math.floor(this.moedas);
  }

  moedasPorSegundo() {
    var self = this;
    setTimeout(function () {
      self.moedas += self.mps;
      self.moedasPorSegundo();
    }, 1000)
  }

  compraItem(item) {
    if (this.moedas >= this.listaCustoItens[item]) {
      this.moedas -= this.listaCustoItens[item]
      this.listaItens[item] += 1;
      this.listaCustoItens[item] += Math.floor(this.listaCustoItens[item] * 0.4);
      if (this.listaItens[item] == 10 || this.listaItens[item] == 50 || this.listaItens[item] == 100 || this.listaItens[item] == 150 || this.listaItens[item] == 200 || this.listaItens[item] == 250 || this.listaItens[item] == 500 || this.listaItens[item] == 1000) {
        this.multiplicadorItens[item] += 1;
      }
      this.atualizarMps();
    }
  }

  compraMelhoria(numero) {
    switch(numero) {
      case 0:
        if(this.moedas >= 50) {
          this.aumentoClick += 1;
          document.querySelector("#melhoria0").remove();
          this.moedas -= 50;
        }
        break;
      case 1:
        if(this.moedas >= 50) {
          this.aumentoClick += 0.5 * this.mps;
          document.querySelector("#melhoria1").remove();
          this.moedas -= 50;
        }
        break;
      case 2:
        if(this.moedas >= 100) {
          this.multiplicadorItens[0] *= 1.25;
          document.querySelector("#melhoria2").remove();
          this.moedas -= 100;
        }
        break;
      case 3:
        if(this.moedas >= 100) {
          this.aumentoMps += 0.05;
          document.querySelector("#melhoria3").remove();
          this.moedas -= 100;
        }
        break;
    }
  }

  atualizarMps() {
    this.mps = this.listaItens[0] * 0.7 * this.multiplicadorItens[0];
    this.mps += this.listaItens[1] * 3.6 * this.multiplicadorItens[1];
    this.mps += this.listaItens[2] * 10.4 * this.multiplicadorItens[2];
    this.mps += this.listaItens[3] * 47.9 * this.multiplicadorItens[3];
    this.mps += this.listaItens[4] * 124.8 * this.multiplicadorItens[4];
    this.mps *= this.aumentoMps;
  }

  clicar() {
    this.moedas += this.click * this.aumentoClick;
  }
}
