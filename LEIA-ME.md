# Site da Chácara Paraíso

## Estrutura
- `index.html` — estrutura da página.
- `assets/css/style.css` — visual (cores, fontes, layout para celular e computador).
- `assets/js/config.js` — **o único arquivo que você precisa editar**: textos, WhatsApp, endereço, fotos, perguntas frequentes.
- `assets/js/main.js` — funcionamento (WhatsApp, menu, galeria, formulário).
- `fotos/` — fotos e vídeo.
- `_backup/index-antigo.html` — versão anterior do site.

Bibliotecas usadas (carregadas da internet, sem instalar nada):
- **Swiper** — carrossel da galeria com arrastar no celular.
- **GLightbox** — abre fotos e vídeo em tela cheia.

## Como adicionar fotos de um ambiente
1. Coloque o arquivo em `fotos/` (ex.: `fotos/salao-1.jpg`).
2. Em `assets/js/config.js`, no ambiente certo: `fotos: ["fotos/salao-1.jpg", "fotos/salao-2.jpg"]`.
3. Para aparecer também no carrossel, adicione em `galeria`.
O selo "Fotos em breve" some sozinho quando o ambiente tem foto.

## WhatsApp
Número em `config.js` → `whatsapp` (55 + DDD + número, só dígitos).
Todos os botões são links diretos para `wa.me`, que abrem o app no celular.

## Testar
VS Code + extensão **Live Server** → botão direito no `index.html` → "Open with Live Server".
Precisa de internet (fontes, bibliotecas e mapa vêm de fora).
Para testar no celular: com o Live Server rodando, acesse `http://IP-DO-PC:5500` no celular, na mesma rede Wi-Fi.

## Publicar
Envie a pasta inteira (sem `_backup`) para Netlify, Vercel ou GitHub Pages.

## Google (SEO)
- No topo do `index.html` ficam o título, a descrição e a "ficha" do Google (bloco `application/ld+json`).
- Se mudar as perguntas frequentes no `config.js`, atualize também o bloco `FAQPage` no `index.html`.
- Ao trocar para domínio próprio (.com.br), substitua `https://chacaraparaiso.github.io/` no `index.html` e no `sitemap.xml`.
- Atualizações de CSS/JS: troque o número `?v=` nos links do `index.html` para o celular não usar versão antiga.
