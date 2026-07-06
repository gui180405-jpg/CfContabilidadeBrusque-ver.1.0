# CF Contabilidade Brusque — Site Institucional

Projeto em **React + Vite + Tailwind**, sem Base44 e sem plugin proprietário.

Esta versão foi reorganizada para ficar mais parecida com um site institucional real:

- Home mais limpa;
- páginas separadas;
- header fixo branco;
- área de blog preparada;
- conteúdo centralizado para personalização.

## Páginas do site

```txt
/             Página inicial
/sobre        Sobre a CF
/servicos     Serviços contábeis
/diagnostico  Diagnóstico contábil
/blog         Blog institucional
/contato      Contato e localização
```

## Como executar localmente

```bash
npm ci
npm run dev
```

Abra o endereço indicado pelo Vite, normalmente:

```txt
http://localhost:5173
```

## Como gerar build

```bash
npm run build
```

O resultado fica na pasta `dist/`.

## Como publicar na Vercel

Configuração recomendada:

```txt
Framework Preset: Vite
Install Command: npm ci
Build Command: npm run build
Output Directory: dist
Node.js Version: 20.x
```

## Onde editar textos

A maioria dos textos está em:

```txt
src/content/siteContent.js
```

Nesse arquivo você altera:

- telefone;
- WhatsApp;
- e-mail;
- endereço;
- textos da Home;
- serviços;
- segmentos;
- FAQ;
- cards futuros do blog.

## Como preencher o blog futuramente

Abra:

```txt
src/content/siteContent.js
```

Procure por:

```js
export const blogPosts = [
```

Edite os cards existentes ou adicione novos.

Enquanto o item estiver com:

```js
draft: true
```

ele aparece como conteúdo futuro/em breve.

## Onde trocar imagens

As imagens ficam em:

```txt
public/
```

Exemplos:

```txt
logo-cf-azul.png
logo-cf-branca.png
cf-recepcao.webp
cf-escritorio-vista.webp
EquipeCfcontabilidade.jpg
```

Para trocar a imagem principal, edite em:

```txt
src/content/siteContent.js
```

```js
heroImage: '/cf-recepcao.webp'
```

## Segurança

- Não usa `dangerouslySetInnerHTML`.
- Links externos usam `rel="noopener noreferrer"`.
- WhatsApp usa `encodeURIComponent`.
- Não coleta dados sensíveis.
- Headers básicos de segurança estão em `vercel.json`.

## Rodar localmente sem baixar ZIP toda hora

Depois de extrair esta versão em uma pasta fixa, rode uma vez:

```bash
npm ci
npm run dev
```

Depois abra:

```txt
http://localhost:5173
```

No Windows, também dá para usar os arquivos:

- `rodar-site.bat`: abre o site localmente.
- `testar-build.bat`: testa se o projeto está pronto para publicar.

Com o site rodando, basta editar os arquivos, salvar e conferir no navegador.
