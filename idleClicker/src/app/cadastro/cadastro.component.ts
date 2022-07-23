import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  nome: string;
  senha: string;

  login() {
    this.router.navigate(['/'])
  }

  cadastro() {

    let data = new Date();
    let dia = data.getDate();
    let ano = data.getFullYear();
    let mes = (data.getMonth() + 1);

    let diaf
    let mesf

    if ((dia + '').length == 1) {
      diaf = "0" + dia
    } else {
      diaf = dia
    }
    if ((mes + '').length == 1) {
      mesf = "0" + mes
    } else {
      mesf = mes
    }

    let dataFinal = ano + '-' + mesf + '-' + diaf
    fetch('http://localhost:3000/api/criar_usuario', { method: 'POST', body: JSON.stringify({ nome: this.nome, senha: this.senha, data: dataFinal }), headers: { "Content-Type": "application/json" } });
    localStorage.setItem('nome', this.nome)
    fetch('http://localhost:3000/api/criar_itens_iniciais', {method: 'POST', body: JSON.stringify({ nome: this.nome }), headers: { "Content-Type": "application/json" }})
    fetch('http://localhost:3000/api/criar_moedas_iniciais', {method: 'POST', body: JSON.stringify({ nome: this.nome }), headers: { "Content-Type": "application/json" }})
  }

}
