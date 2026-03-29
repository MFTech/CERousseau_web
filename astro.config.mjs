import { defineConfig } from 'astro/config';

// IMPORTANTE: ajuste `site` e `base` ao URL público real do site.
// Projeto em subpath no GitHub Pages (sem domínio próprio):
//   site: 'https://ORG.github.io'
//   base: '/REPO_NAME'
// Domínio próprio no GitHub Pages (publicação na raiz):
//   site: 'https://seudominio.com.br'
//   base: '/'
// User/org page (repo ORG.github.io):
//   site: 'https://ORG.github.io', base: '/'

export default defineConfig({
  site: 'https://cerousseau.com.br',
  base: '/',
  output: 'static',
});
