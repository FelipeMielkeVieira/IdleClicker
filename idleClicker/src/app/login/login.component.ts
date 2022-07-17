import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  nome = "";
  senha = "";

  ngOnInit(): void {
  }

  cadastro() {
    this.router.navigate(['/cadastro'])
  }
  
  login() {
    var self = this;
    fetch('http://localhost:3000/api/login', { method: 'POST', body: JSON.stringify({ nome: this.nome, senha: this.senha }), headers: { "Content-Type": "application/json" } }).then(function (e) {

      console.log(e)

      e.json().then(function (data) {

        if (data.user) {
          localStorage.setItem('nome', data.user.NOME)
          self.router.navigate(['/jogo'])
        } else {
          alert("Usuário Inválido!")
        }
      })
    })
  }

}
