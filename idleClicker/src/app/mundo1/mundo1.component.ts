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
    window.addEventListener("beforeunload", function () {
      self.melhoriasCompradas.forEach((e) => {
        fetch('http://localhost:3000/api/atualizar_compraveis', { method: 'POST', body: JSON.stringify({ codigo: e.CODIGO }), headers: { "Content-Type": "application/json" } }).then(() => {
        })
      })
      fetch('http://localhost:3000/api/atualizar_moedas', { method: 'POST', body: JSON.stringify({ nome: nome, moedasComputador: self.moedas }), headers: { "Content-Type": "application/json" } });
      fetch('http://localhost:3000/api/atualizar_variaveis', { method: 'POST', body: JSON.stringify({ nome: nome, aumento_mps: self.aumentoMps, aumento_click: self.aumentoClick }), headers: { "Content-Type": "application/json" } });
    });
  }

  listaItens = [];
  listaMelhorias = [];
  melhoriasCompradas = [];

  mps = 0;
  moedas = 0;
  click = 1;

  aumentoMps = 1;
  aumentoClick = 1;

  bolsa = false;

  ngOnInit() {
    let nome = localStorage.getItem('nome');
    var self = this;
    fetch('http://localhost:3000/api/buscar_itens', { method: 'POST', body: JSON.stringify({ nome: nome }), headers: { "Content-Type": "application/json" } }).then(result => {
      result.json().then(function (data) {
        self.listaItens = data;
      })
    }).then(() => {
      fetch('http://localhost:3000/api/buscar_moedas', { method: 'POST', body: JSON.stringify({ nome: nome }), headers: { "Content-Type": "application/json" } }).then(result => {
        result.json().then(function (data) {
          self.moedas = data[0].MOEDAS_COMPUTADOR;
        })
      }).then(() => {
        fetch('http://localhost:3000/api/buscar_variaveis', { method: 'POST', body: JSON.stringify({ nome: nome }), headers: { "Content-Type": "application/json" } }).then(result => {
          result.json().then(function (data) {
            console.log(data);
            self.aumentoMps = data[0].AUMENTO_MPS;
            self.aumentoClick = data[0].AUMENTO_CLICK;
          })
        }).then(() => {
          fetch('http://localhost:3000/api/buscar_compraveis', { method: 'POST', body: JSON.stringify({ nome: nome }), headers: { "Content-Type": "application/json" } }).then(result => {
            result.json().then(function (data) {
              self.listaMelhorias = data;
            })
          }).then(() => {
            setTimeout(() => {
              self.atualizarMps();
              self.moedasPorSegundo();
            }, 1000)
          });
        });
      });
    });
  }

  formatarMoedas(valor) {
    if (valor - 1000000000000000000000000000000000 >= 0) {
      return (valor / 1000000000000000000000000000000000).toFixed(2) + " De";
    } else if (valor - 1000000000000000000000000000000 >= 0) {
      return (valor / 1000000000000000000000000000000).toFixed(2) + " No";
    } else if (valor - 1000000000000000000000000000 >= 0) {
      return (valor / 1000000000000000000000000000).toFixed(2) + " Oc";
    } else if (valor - 1000000000000000000000000 >= 0) {
      return (valor / 1000000000000000000000000).toFixed(2) + " Sp";
    } else if (valor - 1000000000000000000000 >= 0) {
      return (valor / 1000000000000000000000).toFixed(2) + " Sx";
    } else if (valor - 1000000000000000000 >= 0) {
      return (valor / 1000000000000000000).toFixed(2) + " Qi";
    } else if (valor - 1000000000000000 >= 0) {
      return (valor / 1000000000000000).toFixed(2) + " Qa";
    } else if (valor - 1000000000000 >= 0) {
      return (valor / 1000000000000).toFixed(2) + " T";
    } else if (valor - 1000000000 >= 0) {
      return (valor / 1000000000).toFixed(2) + " B";
    } else if (valor - 1000000 >= 0) {
      return (valor / 1000000).toFixed(2) + " M";
    } else {
      return valor.toFixed(2);
    }
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
      this.listaItens[item].CUSTO += Math.floor(this.listaItens[item].CUSTO * 0.1);
      if (this.listaItens[item].QUANTIDADE == 10 || this.listaItens[item].QUANTIDADE == 50 || this.listaItens[item].QUANTIDADE == 100 || this.listaItens[item].QUANTIDADE == 150 || this.listaItens[item].QUANTIDADE == 200 || this.listaItens[item].QUANTIDADE == 250 || this.listaItens[item].QUANTIDADE == 500 || this.listaItens[item].QUANTIDADE == 1000) {
        this.listaItens[item].MULTIPLICADOR += 1;
      }
      this.atualizarMps();
      this.listaItens.forEach((e) => {
        fetch('http://localhost:3000/api/atualizar_itens', { method: 'POST', body: JSON.stringify({ codigo: e.CODIGO, quantidade: e.QUANTIDADE, multiplicador: e.MULTIPLICADOR, custo: e.CUSTO }), headers: { "Content-Type": "application/json" } })
      })
    }
  }

  compraMelhoria(numero, codigo) {
    switch (codigo) {
      case 1:
        if (this.moedas >= 50) {
          this.aumentoClick += 1;
          this.melhoriasCompradas.push(this.listaMelhorias[numero]);
          this.listaMelhorias.splice(numero, 1);
          this.moedas -= 50;
        }
        break;
      case 2:
        if (this.moedas >= 100) {
          this.aumentoClick += 0.5 * this.mps;
          this.melhoriasCompradas.push(this.listaMelhorias[numero]);
          this.listaMelhorias.splice(numero, 1);
          this.moedas -= 100;
        }
        break;
      case 3:
        if (this.moedas >= 100) {
          this.listaItens[0].MULTIPLICADOR *= 1.25;
          this.melhoriasCompradas.push(this.listaMelhorias[numero]);
          this.listaMelhorias.splice(numero, 1);
          this.moedas -= 100;
        }
        break;
      case 4:
        if (this.moedas >= 200) {
          this.aumentoMps += 0.05;
          this.melhoriasCompradas.push(this.listaMelhorias[numero]);
          this.listaMelhorias.splice(numero, 1);
          this.moedas -= 200;
        }
        break;
      case 5:
        if (this.moedas >= 350) {
          this.listaItens[1].MULTIPLICADOR *= 1.5;
          this.melhoriasCompradas.push(this.listaMelhorias[numero]);
          this.listaMelhorias.splice(numero, 1);
          this.moedas -= 350;
        }
        break;
      case 6:
        if (this.moedas >= 400) {
          this.aumentoMps += 0.1;
          this.melhoriasCompradas.push(this.listaMelhorias[numero]);
          this.listaMelhorias.splice(numero, 1);
          this.moedas -= 400;
        }
        break;
      case 6:
        if (this.moedas >= 500) {
          this.bolsa = true;
          this.melhoriasCompradas.push(this.listaMelhorias[numero]);
          this.listaMelhorias.splice(numero, 1);
          this.moedas -= 500;
        }
        break;
    }
  }

  atualizarMps() {
    this.mps = this.listaItens[0].QUANTIDADE * 0.1 * this.listaItens[0].MULTIPLICADOR;
    this.mps += this.listaItens[1].QUANTIDADE * 0.4 * this.listaItens[1].MULTIPLICADOR;
    this.mps += this.listaItens[2].QUANTIDADE * 1.6 * this.listaItens[2].MULTIPLICADOR;
    this.mps += this.listaItens[3].QUANTIDADE * 2.4 * this.listaItens[3].MULTIPLICADOR;
    this.mps += this.listaItens[4].QUANTIDADE * 4.8 * this.listaItens[4].MULTIPLICADOR;
    this.mps += this.listaItens[5].QUANTIDADE * 10.2 * this.listaItens[5].MULTIPLICADOR;
    this.mps += this.listaItens[6].QUANTIDADE * 40.8 * this.listaItens[6].MULTIPLICADOR;
    this.mps += this.listaItens[7].QUANTIDADE * 124.8 * this.listaItens[7].MULTIPLICADOR;
    this.mps += this.listaItens[8].QUANTIDADE * 522.2 * this.listaItens[8].MULTIPLICADOR;
    this.mps += this.listaItens[9].QUANTIDADE * 1024 * this.listaItens[9].MULTIPLICADOR;
    this.mps += this.listaItens[10].QUANTIDADE * 2048 * this.listaItens[10].MULTIPLICADOR;
    this.mps += this.listaItens[11].QUANTIDADE * 124.8 * this.listaItens[11].MULTIPLICADOR;
    this.mps += this.listaItens[12].QUANTIDADE * 124.8 * this.listaItens[12].MULTIPLICADOR;
    this.mps += this.listaItens[13].QUANTIDADE * 124.8 * this.listaItens[13].MULTIPLICADOR;
    this.mps += this.listaItens[14].QUANTIDADE * 124.8 * this.listaItens[14].MULTIPLICADOR;
    this.mps *= this.aumentoMps;
  }

  clicar() {
    console.log(this.aumentoClick)
    this.moedas += this.click * this.aumentoClick;
  }
}
