
# Processo Seletivo

Olá! 😊

Primeiramente, gostaria de agradecer pela oportunidade de participar deste processo seletivo. Foi uma experiência muito enriquecedora, e espero que o resultado esteja à altura das expectativas.

---

## Estrutura do Repositório

O repositório está organizado em duas pastas principais:

- **`back-end`**: Contém o código relacionado à API e à lógica do servidor.
- **`front-end`**: Contém o código da aplicação React para o cliente.

Embora não seja a organização ideal para projetos maiores, optei por estruturar desta forma para que o repositório fosse mais prático de avaliar e testar, tratando cada pasta como se fosse um repositório independente.

---

## Como Rodar o Projeto

### Passo 1: Configurar Variáveis de Ambiente

1. Na raiz do projeto, há um arquivo **`.env.example`**.

2. Crie um arquivo **`.env`** na raiz do projeto:
   ```bash
   cp .env.example .env
   ```

3. Caso necessário, edite os valores no arquivo **`.env`** para refletir a configuração do ambiente desejado.

---

### Passo 2: Subir os Contêineres com Docker

Certifique-se de ter o **Docker** e o **Docker Compose** instalados no seu sistema. Com tudo configurado, rode o seguinte comando na raiz do projeto:

```bash
docker-compose up
```

Esse comando irá iniciar todos os serviços definidos no arquivo `docker-compose.yml`, incluindo o back-end, front-end e banco de dados.

---

### Passo 3: Acessar os Serviços

Após rodar o comando anterior, os serviços estarão disponíveis nas seguintes URLs:

- **Front-End**: Acesse a aplicação React em [http://localhost:3000/](http://localhost:3000/)
- **Back-End**: Acesse a API em [http://localhost:8000/](http://localhost:8000/)
- **Swagger (Documentação da API)**: Acesse em [http://localhost:8000/docs](http://localhost:8000/docs)

---

## Observações

1. O uso do Docker simplifica a inicialização do projeto, garantindo que todos os serviços sejam executados em um ambiente controlado e consistente.
2. A escolha por manter o código do **back-end** e do **front-end** em um único repositório foi feita para facilitar o processo de avaliação. Cada pasta (`back-end` e `front-end`) é estruturada como um repositório independente, o que facilita testes e implementações.
3. Caso ocorra algum problema na inicialização, verifique se todas as variáveis de ambiente foram configuradas corretamente no arquivo `.env`.

---

## Agradecimento

Mais uma vez, gostaria de agradecer pela oportunidade de participar deste processo seletivo. Foi uma experiência desafiadora e gratificante, e espero que o projeto esteja de acordo com as expectativas.

Se houver qualquer dúvida ou feedback, ficarei à disposição para ajudar! 🚀

Atenciosamente,  
Joel Gonçalves
