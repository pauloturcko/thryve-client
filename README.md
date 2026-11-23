This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Fluxo de branches e deploy

- `main` = produção, `developer` = ambiente de teste. A `developer` é a branch padrão do repositório.
- Toda feature/fix sai de uma branch própria e abre PR para a **`developer`**.
- Quando a `developer` acumula o que deve ir para produção, abra uma PR **`developer` → `main`** (a "versão") e faça o merge com **"Create a merge commit"**, nunca squash: com squash a `main` ganha um commit que a `developer` não tem e as próximas versões repetem commits ou dão conflito.
- PR para a `main` só é aceita vinda da `developer` ou de `hotfix/*` (workflow `Origem da PR`). Depois de um hotfix, abra PR `main` → `developer`.
- O CI (`.github/workflows/ci.yml`) roda lint, build e typecheck em toda PR e push para `developer`/`main`; o check `ci` é obrigatório para o merge.
- Deploy: o Railway publica a `main` em produção; o ambiente de teste publica a `developer` e aponta para a API de teste (`NEXT_PUBLIC_API_URL`).
