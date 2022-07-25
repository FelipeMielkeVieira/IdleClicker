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
        console.log(data)
      })
    });
    fetch('http://localhost:3000/api/buscar_moedas', { method: 'POST', body: JSON.stringify({ nome: nome }), headers: { "Content-Type": "application/json" } }).then(result => {
      result.json().then(function (data) {
        self.moedas = data[0].MOEDAS_COMPUTADOR;
      })
    });

    window.addEventListener("beforeunload", function () {
      fetch('http://localhost:3000/api/atualizar_moedas', { method: 'POST', body: JSON.stringify({ nome: nome, moedasComputador: self.moedas }), headers: { "Content-Type": "application/json" } });
      self.listaItens.forEach((e) => {
        fetch('http://localhost:3000/api/atualizar_itens', { method: 'POST', body: JSON.stringify({ codigo: e.CODIGO, quantidade: e.QUANTIDADE, multiplicador: e.MULTIPLICADOR, custo: e.CUSTO }), headers: { "Content-Type": "application/json" } })
      })
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
    setTimeout(() => {
      this.atualizarMps();
      this.moedasPorSegundo();
    }, 1000)
  }

  formatarMoedas(valor) {
    if(valor - 1000000000000000000000000000000000 >= 0) {
      return (valor / 1000000000000000000000000000000000).toFixed(2) + " De";
    } else if(valor - 1000000000000000000000000000000 >= 0) {
      return (valor / 1000000000000000000000000000000).toFixed(2) + " No";
    } else if(valor - 1000000000000000000000000000 >= 0) {
      return (valor / 1000000000000000000000000000).toFixed(2) + " Oc";
    } else if(valor - 1000000000000000000000000 >= 0) {
      return (valor / 1000000000000000000000000).toFixed(2) + " Sp";
    } else if(valor - 1000000000000000000000 >= 0) {
      return (valor / 1000000000000000000000).toFixed(2) + " Sx";
    } else if(valor - 1000000000000000000 >= 0) {
      return (valor / 1000000000000000000).toFixed(2) + " Qi";
    } else if(valor - 1000000000000000 >= 0) {
      return (valor / 1000000000000000).toFixed(2) + " Qa";
    } else if(valor - 1000000000000 >= 0) {
      return (valor / 1000000000000).toFixed(2) + " T";
    } else if(valor - 1000000000 >= 0) {
      return (valor / 1000000000).toFixed(2) + " B";
    } else if(valor - 1000000 >= 0) {
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
    this.moedas += this.click * this.aumentoClick;
  }
}
