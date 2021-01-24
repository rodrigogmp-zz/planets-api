


# **Uma api construída utilizando NodeJS**

Baseada no boilerplate _BloodBoiler_: https://github.com/lucas-a-pelegrino/node-bloodboiler

* Configuração:
  * Executar npm install dentro do diretório.
  * Criar o arquivo .env na raiz do projeto (baseado no env.example).
  * Inserir as credenciais do MongoDB no arquivo .env.

* Para executar a API basta utilizar o comando npm run start:dev

* Para executar os testes basta utilizar o comando npm test

* Documentação: Os arquivos correspondenras à _collection_ (planets-api.postman_collection.json) e ao _environment_ (planets-api.postman_environment.json) do postman, estão presentes na raiz do projeto

* Endpoints:
  * Criação de planeta.
    * Rota: POST /api/v1/planets
    * Este endpoint utiliza a API pública SWAPI para coletar informações.
  * Edição de planeta.
    * Rota: PUT /api/v1/planets/:id
  * Listagem de planetas.
    * Rota: GET /api/v1/planets
  * Busca de planeta por id.
    * Rota: GET /api/v1/planets/:id
  * Busca de planeta por nome.
    * Rota: GET /api/v1/planets/:name
  * Remoção de planeta.
    * Rota: DELETE /api/v1/planets/:id