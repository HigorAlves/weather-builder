![](https://platformbuilders.io/assets/images/logo.png)

# Desafio - Weather App


## Aplicativo de Clima 
Desenvolva um aplicativo que consuma a localização atual do usuário e exiba na interface o endereço atual os dados climáticos da região e um botão para atualizar os dados.

* Para fazer essa busca, pode-se usar a API do Open Weather Map: 
http://api.openweathermap.org/data/2.5/find?lat={LAT}&lon={LON}&cnt=15&APPID=<APP_ID> . 

*  Para obter o app id, cadastre-se aqui:  https://home.openweathermap.org/users/sign_up 

## Tecnologias
Pode-se utilizar tanto React quanto React Native. É permitido o uso de qualquer biblioteca para facilitar o desenvolvimento.

## Keys da API
É Preciso criar uma key sua no OpenWeatherMap e colocala num arquivo .env na raiz deste projeto da seguinte forma:

```
REACT_APP_API_KEY='<YOUR-KEY>'
```