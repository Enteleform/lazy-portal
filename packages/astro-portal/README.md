A framework-agnostic portal system for micro-frontend & streaming contexts.

![Counters](https://user-images.githubusercontent.com/10906415/168481107-909fc126-783d-409e-8dd6-b2ca12cd69d4.jpg)


&nbsp;  
Check out a *"kitchen sink"* demo here:  
### [lazy-portal/Demo](https://github.com/Enteleform/lazy-portal/tree/main/apps/Demo#readme)


&nbsp;  
Try it out here:

<a href="https://stackblitz.com/edit/github-wxgykc?file=src%2Fpages%2Findex.astro">
  <img height="32" src="https://developer.stackblitz.com/img/open_in_stackblitz.svg"/>
</a>




&nbsp;  
<!--########################################################################-->
# Installation
<!--########################################################################-->

### NPM

```bash
npm install astro-portal
```

### astro.config.js
```ts
import {defineConfig} from "astro/config"
import {AstroPortal } from "astro-portal"


export default defineConfig({
  integrations: [
    AstroPortal(),
  ],
})
```




&nbsp;  
<!--########################################################################-->
# Usage
<!--########################################################################-->

See: [`lazy-portal/#Usage`](https://github.com/Enteleform/lazy-portal/tree/main/packages/lazy-portal#usage)
