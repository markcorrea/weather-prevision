Forecast




Visão geral do projeto:


Forecast é um projeto-teste que visa demonstrar o conhecimento do programador em sua área de atuação. No caso deste projeto, o Frontend.
Basicamente, o projeto é um ambiente que fornece a previsão do tempo, de acordo com a cidade selecionada. É importante frisar que, por se tratar de um projeto para avaliação do Frontend, as informações não são verídicas, visto que não há uma conexão real com uma API que forneça os dados. Estes dados são estáticos, fornecidos por 'mock-ups' localizados em arquivos JSON dentro do próprio projeto, conforme veremos mais abaixo.

No topo da página, é possível encontrar três links, que direcionam para os sites onde o layout e as informações deste projeto foram 'inspirados'.

O projeto é composto por duas telas:

- Tela de listagem de cidades cadastradas, com possibilidade de cadastrar novas cidades, desde que estejam disponíveis para cadastro. Do lado esquerdo há um formulário de dois campos que fornece as cidades disponíveis para cadastro. Do lado direito há uma listagem que já exibe o nome e as informações básicas do clima nas cidades. O ícone 'reticências' (...) irá direcionar para uma página de detalhes, enquanto o ícone 'excluir' (X) irá remover aquela cidade da lista.

- Tela de detalhes da cidade selecionada. Quando o usuário clica no ícone para mais detalhes, ele é direcionado para esta página, que exibe os detalhes da previsão do tempo para aquela cidade, bem como os dados básicos para os próximos 5 dias da semana. Ao lado do nome da cidade, há um ícone com uma seta para a esquerda, para retornar à listagem de cidades.


---------------------------------------------------




Instalação do projeto:


A instalação inicial do projeto acontece na maior parte via "Terminal". Portanto, recomenda-se que seja instalado em um computador com ambiente Linux ou MAC.

- Primeiramente, é necessário que o ambiente tenha instalado a biblioteca NPM. Caso não tenha, o mesmo pode ser obtido aqui: https://nodejs.org/en/;

- Uma vez instalado o NPM, adicionaremos o GULP e o BOWER, necessários para instalação dos próximos passos. Via terminal, digitaremos os comandos:

npm install -g gulp

npm install -g bower

- Uma vez finalizados, acesse a pasta raiz (root) do projeto via terminal. Certifique-se de estar na pasta onde estão localizados arquivos como 'gulpfile.js' e 'package.json'. Após isso, digite os comando:

npm install

- Este comando instalará as dependências no documento 'package.json'. Finalizados, digite o comando:

npm install -g nodemon

- Nodemon não é incluso no arquivo 'package.json', por isso é instalado separadamente. Próximo comando:

bower install

- Irá instalar as dependências necessárias para os arquivos .CSS e .JS. Próximo comando:

gulp generate

- irá gerar os arquivos concatenados .CSS e .JS, de onde o projeto buscará os dados. Uma vez finalizado, digite o comando:

npm run watch

- Este último comando iniciará um ambiente onde o projeto será executado. Ele não finalizará, mas permanecerá em estado de 'observação', caso alguma mudança ocorra no projeto. Quando estiver pronto, ele exibirá a mensagem "Express server listening on port 4100". Mantenha o comando em observação, abra o navegador e acesse a URL 'http://localhost:4100'.

- Se todos os processos acima foram concluídos com êxito, a listagem de cidades deverá aparecer no navegador. Caso seja necessário fazer alguma alteração nos arquivos do projeto, abra uma nova aba do Terminal e execute novamente o comando "gulp generate" (atenção, não finalize o comando do NPM. Caso contrário, o projeto não estará mais acessível. Se isso acontecer, execute novamente o comando 'npm run watch').

---------------------------------------------------





Estrutura do projeto


A estrutura de pastas do projeto é organizada visando a melhor separação dos diretórios por função, deixando o projeto mais modular, caso venham a ser implementadas mais funções posteriormente.

A pasta raiz (root) possui os arquivos de configuração inicial do projeto.

Na pasta 'src' (abreviação para 'source') encontra-se a página inicial 'index.html'. As demais pastas estão separadas por suas funções:
- - app: Onde localiza-se o projeto em si e suas páginas;
- - media: Mídias do projeto, sendo os arquivos .CSS, .JS, imagens e bibliotecas;
- - mocks: Como o projeto não se conecta a nenhuma API, aqui estão os arquivos JSON, simulando um 'banco de dados';

A pasta 'app' separa os módulos e os serviços no projeto, sendo:
- - modules: Possui a estrutura do projeto, bem como suas Views e Controllers.
- - services: Serviços que buscam os dados que vêm da API (simulação de API).

A pasta 'modules' armazena todos os módulos do projeto, separados por pastas. No nosso caso, há apenas um módulo denominado 'cities', que possui dentro de si as Views e Controllers, bem como os arquivos de configuração:
- - views: Arquivos HTML divididos por páginas;
- - controller: Faz o gerenciamento '2-way data-binding' no tráfego de informações em Javascript. Solicita as rotas da API através dos serviços, quando necessário, exibindo-os na view. Da mesma forma, coleta os dados da view e envia à API através de serviços específicos.
- - config: Arquivo de configuração, determina a controller específica para cada view e atribui uma rota de acesso via URL através do 'angular-ui-router'.


--------------------------------------------------





Bibliotecas utilizadas:


NPM
- Gerenciador de bibliotecas em javascript, para instalação e gerenciamento dos pacotes necessários.

EXPRESS
- Framework para Node.js, utilizado aqui somente como 'servidor' para execução do projeto na URL 'http://localhost:4100'.

NODEMON
- Ao iniciar o projeto utilizando NODEMON, se alguma alteração for feita no projeto posteriormente, ele irá reiniciar o EXPRESS de forma automática.

BOWER
- Gerenciador de dependências para desenvolvimento no Frontend, instala-as automaticamente a partir de um comando no terminal. Exemplo: Jquery, Bootstrap e AngularJS

GULP
- Automatizador de tarefas, durante o desenvolvimento, torna automáticos processos que normalmente seriam feitos à mão. São estas as tarefas:
- - gulp-clean (remove o arquivo .JS concatenado);
- - gulp-compass (ativa e mantém o Compass, gerando um arquivo .CSS a partir de arquivos .SASS);
- - gulp-concat (varre o projeto em busca de todos os arquivos .JS determinados previamente, concatenando-os em um único arquivo .JS);
- - gulp-replace (auxilia na criação de novos módulos);
- - gulp-watch (executa todos os processos anteriores e inicia o 'observador'. Caso haja alterações em arquivos .JS ou .SASS, ele fará todo o processo novamente);

JQUERY
- Biblioteca Javascript, necessária para uso das próximas dependências;

BOOTSTRAP
- Biblioteca de componentes em .CSS e .JS, tornando mais flexível o layout do projeto;

FONT-AWESOME
- Biblioteca externa que fornece ícones para o layout doprojeto.

ANGULAR JS
- Biblioteca Javascript para criação de aplicações web.

ANGULAR BOOTSTRAP
- Recurso do AngularJS para implementação do Bootstrap pelo próprio AngularJS.

ANGULAR-UI-ROUTER
- Recurso do AngularJS para gerenciamento das rotas de acesso via URL do projetol

ANGULAR-RESOURCE
- Recurso do AngularJS para serviços de acesso a APIs externas, permitindo tarefas como POST e GET de dados.