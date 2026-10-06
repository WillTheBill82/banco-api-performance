

# banco-api-performance

Repositório destinado à criação e execução de **testes de performance de APIs**, utilizando **JavaScript** e **k6**.

O projeto foi estruturado para facilitar a organização dos cenários de teste, dados utilizados durante as execuções, configurações e funções auxiliares, permitindo a realização de testes de carga e análise do comportamento da API sob diferentes condições de utilização.

---

## 📌 Introdução

O **banco-api-performance** é um projeto de testes de performance desenvolvido com **JavaScript e k6**.

O objetivo é permitir a execução de cenários de performance contra uma API, possibilitando avaliar principalmente:

* Tempo de resposta das requisições;
* Quantidade de requisições processadas;
* Taxa de erros;
* Comportamento da API sob carga;
* Capacidade de atendimento de usuários virtuais simultâneos;
* Identificação de possíveis gargalos de performance;
* Comparação do comportamento da aplicação entre diferentes execuções.

A URL da API utilizada nos testes não fica diretamente definida nos scripts. O projeto utiliza a variável de ambiente `BASE_URL`, permitindo executar os mesmos testes contra diferentes ambientes, como desenvolvimento, homologação ou produção.

Exemplo:

```bash
k6 run -e BASE_URL=https://seu-ambiente.com tests/exemplo.js
```

No código JavaScript, a variável pode ser acessada através de:

```javascript
const baseUrl = __ENV.BASE_URL;
```

Essa abordagem evita a necessidade de alterar os scripts sempre que o ambiente de teste for modificado.

---

## 🛠️ Tecnologias utilizadas

### JavaScript

Linguagem utilizada para implementação dos scripts de teste e organização da lógica dos cenários.

Os scripts executados pelo k6 utilizam JavaScript/ES6 e podem ser organizados em módulos reutilizáveis.

### k6

Ferramenta utilizada para execução dos testes de performance.

O k6 permite trabalhar com usuários virtuais (VUs), duração dos testes, cenários, métricas, thresholds e diferentes formas de exportação dos resultados. ([Grafana Labs][2])

### Node.js / npm

O projeto possui gerenciamento de dependências JavaScript através do `package-lock.json`.

O Node.js/npm pode ser utilizado para instalação e gerenciamento das dependências auxiliares do projeto.

> **Importante:** o k6 possui seu próprio runtime JavaScript. Portanto, os scripts de teste não são executados pelo Node.js; o Node/npm é utilizado para o ecossistema auxiliar do projeto.

### Git / GitHub

Utilizados para versionamento, colaboração e armazenamento do código-fonte.

---

## 📂 Estrutura do repositório

A estrutura principal do projeto está organizada da seguinte forma:

```text
banco-api-performance/
│
├── config/
│   └── ...
│
├── fixtures/
│   └── ...
│
├── helpers/
│   └── ...
│
├── tests/
│   └── ...
│
├── utils/
│   └── ...
│
├── .gitignore
├── README.md
└── package-lock.json
```

### `config/`

Contém arquivos relacionados às **configurações utilizadas pelos testes**.

O objetivo desse grupo é centralizar informações de configuração que possam ser utilizadas por diferentes cenários, evitando a duplicação de valores dentro dos scripts.

Exemplos de informações que podem ser centralizadas:

* Configurações dos cenários;
* Parâmetros de execução;
* URLs e configurações de ambiente;
* Quantidade de usuários virtuais;
* Durações;
* Thresholds;
* Outras configurações compartilhadas.

A URL base da aplicação deve ser fornecida através da variável de ambiente `BASE_URL`.

---

### `fixtures/`

Contém **dados utilizados pelos testes**.

Fixtures permitem separar os dados de teste da lógica responsável pela execução dos cenários.

Podem ser utilizados, por exemplo, para armazenar:

* Dados de usuários;
* Payloads;
* Dados de requisições;
* Informações utilizadas em massa;
* Dados necessários para determinados cenários.

Essa separação facilita a manutenção e reutilização dos dados durante os testes.

---

### `helpers/`

Contém **funções auxiliares reutilizáveis** utilizadas pelos testes.

O objetivo é evitar que a mesma lógica seja implementada repetidamente em diferentes arquivos.

Exemplos:

* Funções para criação de requisições;
* Funções para autenticação;
* Validações;
* Tratamento de respostas;
* Preparação de dados;
* Funções compartilhadas entre cenários.

---

### `tests/`

Contém os **cenários de testes de performance**.

É o principal grupo de arquivos do projeto e onde ficam os scripts responsáveis pela execução das cargas contra a API.

Os testes podem ser organizados de acordo com o objetivo do cenário, por exemplo:

```text
tests/
├── smoke/
├── load/
├── stress/
└── spike/
```

#### Smoke Test

Executa uma carga pequena para verificar se o cenário e a API estão funcionando corretamente antes de testes mais intensos.

#### Load Test

Avalia o comportamento da aplicação sob uma carga esperada de utilização.

#### Stress Test

Aumenta progressivamente a carga para identificar os limites de capacidade da aplicação.

#### Spike Test

Aplica um aumento significativo e repentino de carga para avaliar como a aplicação reage a picos de acesso.

> A organização acima representa a finalidade dos grupos de testes. Os nomes e subdiretórios efetivamente presentes no projeto podem evoluir conforme novos cenários forem adicionados.

---

### `utils/`

Contém **utilitários gerais** utilizados pelo projeto.

Diferentemente de `helpers`, que normalmente concentra funções diretamente relacionadas aos cenários de teste, `utils` pode armazenar funções mais genéricas e independentes da regra específica de um teste.

Exemplos:

* Geração de dados;
* Manipulação de valores;
* Formatação;
* Funções matemáticas;
* Tratamento de informações;
* Utilitários compartilhados.

---

### `.gitignore`

Define arquivos e diretórios que não devem ser versionados pelo Git.

Atualmente, o projeto possui configuração para ignorar arquivos relacionados aos relatórios gerados durante a execução dos testes. ([GitHub][3])

---

### `package-lock.json`

Arquivo responsável por registrar as versões exatas das dependências npm instaladas no projeto, contribuindo para que diferentes ambientes utilizem versões consistentes das dependências.

---

## 🚀 Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/WillTheBill82/banco-api-performance.git
```

Entrar no diretório:

```bash
cd banco-api-performance
```

### 2. Instalar as dependências

Caso o projeto possua dependências npm configuradas:

```bash
npm install
```

Para uma instalação baseada exclusivamente no lockfile:

```bash
npm ci
```

### 3. Instalar o k6

O k6 precisa estar instalado na máquina para executar os testes localmente.

Após a instalação, valide:

```bash
k6 version
```

Exemplo de instalação no macOS utilizando Homebrew:

```bash
brew install k6
```

No Windows, o k6 também pode ser instalado utilizando ferramentas como `winget` ou Chocolatey. A documentação oficial do k6 apresenta as opções de instalação para os diferentes sistemas operacionais. ([Grafana Labs][2])

---

## ▶️ Execução dos testes

Os testes devem receber a URL da API através da variável de ambiente `BASE_URL`.

### Execução básica

```bash
k6 run -e BASE_URL=https://seu-ambiente.com tests/exemplo.js
```

Exemplo:

```bash
k6 run -e BASE_URL=https://homologacao.exemplo.com tests/load.js
```

A variável será disponibilizada no script através de:

```javascript
__ENV.BASE_URL
```

Por exemplo:

```javascript
import http from 'k6/http';

export default function () {
    const response = http.get(`${__ENV.BASE_URL}/api/exemplo`);
}
```

---

## 📊 Execução com relatório em tempo real

O k6 possui um dashboard web que permite acompanhar a execução do teste em tempo real.

Para habilitar o dashboard:

```bash
K6_WEB_DASHBOARD=true k6 run -e BASE_URL=https://seu-ambiente.com tests/exemplo.js
```

Durante a execução, o k6 disponibiliza o acompanhamento visual das métricas do teste.

Esse modo é especialmente útil para acompanhar:

* Usuários virtuais;
* Requisições;
* Taxa de erros;
* Tempo de resposta;
* Throughput;
* Métricas HTTP;
* Evolução da execução ao longo do tempo.

O dashboard web é habilitado através das configurações do próprio k6, sem necessidade de adicionar uma aplicação externa ao projeto.

---

## 📁 Exportação do relatório

O dashboard também pode ser utilizado em conjunto com as opções de exportação do k6.

Para habilitar o dashboard e gerar um relatório HTML ao final da execução:

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run -e BASE_URL=https://seu-ambiente.com tests/exemplo.js
```

O relatório será salvo no arquivo:

```text
html-report.html
```

Exemplo completo:

```bash
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT=html-report.html \
k6 run \
-e BASE_URL=https://homologacao.exemplo.com \
tests/load.js
```

### Executando em uma única linha

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run -e BASE_URL=https://homologacao.exemplo.com tests/load.js
```

Dessa forma, é possível:

1. Definir a URL da API através de `BASE_URL`;
2. Executar o cenário de performance;
3. Acompanhar os resultados em tempo real através do dashboard web;
4. Gerar um relatório HTML ao final da execução.

> As variáveis `K6_WEB_DASHBOARD` e `K6_WEB_DASHBOARD_EXPORT` são configurações do próprio k6. A utilização de variáveis de ambiente permite alterar o comportamento da execução sem modificar os scripts de teste.

---

## 🔐 Variáveis de ambiente

As principais variáveis utilizadas na execução são:

| Variável                  | Obrigatória | Descrição                                   |
| ------------------------- | ----------- | ------------------------------------------- |
| `BASE_URL`                | Sim         | URL base da API que será submetida ao teste |
| `K6_WEB_DASHBOARD`        | Não         | Habilita o dashboard web do k6              |
| `K6_WEB_DASHBOARD_EXPORT` | Não         | Define o arquivo de exportação do dashboard |

### Exemplo

```bash
BASE_URL=https://homologacao.exemplo.com
```

Durante a execução:

```bash
k6 run -e BASE_URL=https://homologacao.exemplo.com tests/exemplo.js
```

Com dashboard e exportação:

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run -e BASE_URL=https://homologacao.exemplo.com tests/exemplo.js
```

---

## 🧪 Boas práticas

Ao criar novos cenários de performance:

* Evite deixar URLs diretamente nos scripts;
* Utilize `BASE_URL` para definir o ambiente de execução;
* Separe dados de teste em `fixtures`;
* Centralize funções reutilizáveis em `helpers` e `utils`;
* Mantenha configurações separadas dos cenários;
* Utilize nomes descritivos para os testes;
* Defina thresholds quando houver critérios objetivos de performance;
* Evite executar cargas elevadas contra ambientes compartilhados sem autorização;
* Registre os resultados relevantes das execuções;
* Compare os resultados entre versões da aplicação para identificar regressões de performance.

---

## 📚 Referências

* [Repositório banco-api-performance](https://github.com/WillTheBill82/banco-api-performance?utm_source=chatgpt.com)
* [Documentação oficial do k6 — Running k6](https://grafana.com/docs/k6/latest/get-started/running-k6/?utm_source=chatgpt.com)
* [Documentação oficial do k6 — Options](https://grafana.com/docs/k6/latest/using-k6/k6-options/?utm_source=chatgpt.com)

**Observação importante:** deixei a documentação dos grupos baseada na estrutura que está efetivamente visível no seu repositório (`config`, `fixtures`, `helpers`, `tests` e `utils`) sem inventar nomes de arquivos internos que não consegui confirmar pela interface pública do GitHub. ([GitHub][1])

Também vale destacar que o uso de `BASE_URL` com `-e BASE_URL=...` é compatível com a forma documentada de execução do k6. ([Grafana Labs][2])

**Quer que eu faça a próxima versão mais “profissional de portfólio” ou mais “documentação técnica de empresa”?**

[1]: https://github.com/WillTheBill82/banco-api-performance "GitHub - WillTheBill82/banco-api-performance · GitHub"
[2]: https://grafana.com/docs/k6/latest/get-started/running-k6/?utm_source=chatgpt.com "Running k6 | Grafana k6 documentation"
[3]: https://github.com/WillTheBill82/banco-api-performance/blob/main/.gitignore "banco-api-performance/.gitignore at main · WillTheBill82/banco-api-performance · GitHub"
