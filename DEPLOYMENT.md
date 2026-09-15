# GitHub Pages

Site: https://rickygod.github.io/

- `main`: website source
- `gh-pages`: static export served by GitHub Pages
- `npm run dev -- --port 3001`: local development at root path
- `npm run deploy:pages`: build at the domain root and publish to gh-pages

Publishing requires GitHub CLI authentication as an account with repository write access.
Source pushes alone do not deploy. Commit and push source changes, then run the deployment command.
Local audit reports, backups, environment files, and internal source documents are excluded.
