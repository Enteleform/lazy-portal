---
layout: "Layouts/DocsPage/index.astro"
---


## NPM

```bash
npm install astro-portal
```

## astro.config.js
```ts
import {defineConfig} from "astro/config"
import {AstroPortal } from "astro-portal"


export default defineConfig({
	integrations: [
		AstroPortal(),
	],
})
```
