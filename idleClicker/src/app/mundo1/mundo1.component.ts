import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mundo1',
  templateUrl: './mundo1.component.html',
  styleUrls: ['./mundo1.component.css']
})
export class Mundo1Component implements OnInit {

  constructor() {
    let nome = localStorage.getItem('nome');
    var self = this;
    fetch('http://localhost:3000/api/buscar_itens', { method: 'POST', body: JSON.stringify({ nome: nome }), headers: { "Content-Type": "application/json" } }).then(result => {
      result.json().then(function (data) {
        self.listaItens = data;
      })
    });
    fetch('http://localhost:3000/api/buscar_moedas', { method: 'POST', body: JSON.stringify({ nome: nome }), headers: { "Content-Type": "application/json" } }).then(result => {
      result.json().then(function (data) {
        self.moedas = data[0].MOEDAS_COMPUTADOR;
      })
    });

    window.addEventListener("beforeunload", function () {
      fetch('http://localhost:3000/api/atualizar_moedas', { method: 'POST', body: JSON.stringify({ nome: nome, moedasComputador: self.moedas }), headers: { "Content-Type": "application/json" } });
    });
  }

  listaItens = [];

  mps = 0;
  moedas = 0;
  click = 1;

  custoClicar = 10;
  custoMps = 100;

  aumentoMps = 1;
  aumentoClick = 1;

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
    if (this.moedas >= this.listaItens[item].CUSTO) {
      this.moedas -= this.listaItens[item].CUSTO
      this.listaItens[item].QUANTIDADE += 1;
      this.listaItens[item].CUSTO += Math.floor(this.listaItens[item].CUSTO * 0.4);
      if (this.listaItens[item].QUANTIDADE == 10 || this.listaItens[item].QUANTIDADE == 50 || this.listaItens[item].QUANTIDADE == 100 || this.listaItens[item].QUANTIDADE == 150 || this.listaItens[item].QUANTIDADE == 200 || this.listaItens[item].QUANTIDADE == 250 || this.listaItens[item].QUANTIDADE == 500 || this.listaItens[item].QUANTIDADE == 1000) {
        this.listaItens[item].MULTIPLICADOR += 1;
      }
      this.atualizarMps();
    }
  }

  compraMelhoria(numero) {
    switch (numero) {
      case 0:
        if (this.moedas >= 50) {
          this.aumentoClick += 1;
          document.querySelector("#melhoria0").remove();
          this.moedas -= 50;
        }
        break;
      case 1:
        if (this.moedas >= 50) {
          this.aumentoClick += 0.5 * this.mps;
          document.querySelector("#melhoria1").remove();
          this.moedas -= 50;
        }
        break;
      case 2:
        if (this.moedas >= 100) {
          this.listaItens[0].MULTIPLICADOR *= 1.25;
          document.querySelector("#melhoria2").remove();
          this.moedas -= 100;
        }
        break;
      case 3:
        if (this.moedas >= 100) {
          this.aumentoMps += 0.05;
          document.querySelector("#melhoria3").remove();
          this.moedas -= 100;
        }
        break;
    }
  }

  atualizarMps() {
    this.mps = this.listaItens[0].QUANTIDADE * 0.7 * this.listaItens[0].MULTIPLICADOR;
    this.mps += this.listaItens[1].QUANTIDADE * 3.6 * this.listaItens[1].MULTIPLICADOR;
    this.mps += this.listaItens[2].QUANTIDADE * 10.4 * this.listaItens[2].MULTIPLICADOR;
    this.mps += this.listaItens[3].QUANTIDADE * 47.9 * this.listaItens[3].MULTIPLICADOR;
    this.mps += this.listaItens[4].QUANTIDADE * 124.8 * this.listaItens[4].MULTIPLICADOR;
    this.mps *= this.aumentoMps;
  }

  clicar() {
    this.moedas += this.click * this.aumentoClick;
  }
}
