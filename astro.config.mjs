import { defineConfig } from 'astro/config';

// IMPORTANTE: ajuste `site` e `base` para o seu repositório GitHub.
// Se o repo for https://github.com/ORG/REPO_NAME, use:
//   site: 'https://ORG.github.io'
//   base: '/REPO_NAME'
// Se for uma user/org page (repo chamado "ORG.github.io"), use:
//   site: 'https://ORG.github.io'
//   base: '/'  (ou simplesmente omita o base)

export default defineConfig({
  site: 'https://mftech.github.io',
  base: '/CERousseau_web',
  output: 'static',
});
