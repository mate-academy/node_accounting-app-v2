Antes, todo o código estava concentrado em um único arquivo.
Agora, o projeto segue esta estrutura:
src/
 ├─ createServer.js
 ├─ users/
 │   ├─ usersRoutes.js
 │   └─ usersController.js
 └─ expenses/
     ├─ expensesRoutes.js
     └─ expensesController.js
Antes os arrays users, expenses e os contadores de IDs ficavam fora de createServer, sendo importados por diferentes módulos.
Isso causava:

compartilhamento de estado entre testes

dados persistindo indevidamente

resultados errados (ex: testes esperando array vazio, mas não estava)

Solução implementada:

Todos os dados agora vivem dentro do createServer, usando:
app.locals.users = [];
app.locals.expenses = [];
app.locals.userIdCounter = 1;
app.locals.expenseIdCounter = 1;
Cada vez que createServer() é chamado, ele cria um novo banco em memória, garantindo isolamento total para os testes.

Injeção de dados via req

Para que controllers acessem o “banco” corretamente, usamos middlewares
Todos os controllers foram reescritos para buscar arrays dentro de req.app.locals
