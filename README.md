# DronePainelIntegrations

Front-end para o Projeto de Integrations & Dev Tools da FIAP (36SCJ).

## 🛠 Instalação

Instale as dependências através do comando `npm install`.

Altere o arquivo `proxy.config.js`, no `target` para a URL do Back-end 
```javascript
const proxy = [
	{
		context: "/uri",
		target: "http://localhost:4300", // Altere esta linha
		pathRewrite: { "^/uri": "" },
	}
];
module.exports = proxy;
```

Após os comandos anteriores, rode o `npm start` para subir o projeto utilizando a configuração de proxy.

## 🦾Funcionalidades

O projeto contem 2 partes, o Cadastro de Drones e o Monitoramento

----

### ✈ Cadastro dos drones

O cadastro contem 2 telas a `consulta` e o `cadastro de medições`.

A tela de consulta apresenta todos os drones cadastrados e tambem é responsavel pelo reenvio dos dados. 
O intervalo está configurado no arquivo de `enviroment` (`src/enviroments/enviroments.ts`) na variável `localStorage['droneTimer']`

Na tela de cadastro é possivel enviar os dados de medições tanto de novos drones quanto drones já monitorados. 
A tela valida se o código do drone foi inserido e se a latitude/longitude é valida.


### 🌎 Monitoramento

A tela de monitoramento contem o Grid de consulta, apresentando todos os drones, com suas respectivas posições. No botão `Follow` ele irá demonstrar no mapa os posicionamentos registrados pelo drone

----
## Projeto realizado por:
- Aruna Fernanda Martins – RM 338577
- Ayrton Henrique Gomes Silva – RM 337089
- Carlos Eduardo Roque da Silva – RM 338866
- Sara Regina Pires – RM 338142
- Willian Yoshiaki Kazahaya – RM 338950
