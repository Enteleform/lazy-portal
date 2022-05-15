A framework-agnostic portal system for micro-frontend & streaming contexts.

![Counters](https://user-images.githubusercontent.com/10906415/168481107-909fc126-783d-409e-8dd6-b2ca12cd69d4.jpg)


&nbsp;  
Check out a *"kitchen sink"* demo here:  
### [lazy-portal/Demo](https://github.com/Enteleform/lazy-portal/tree/main/apps/Demo#readme)


&nbsp;  
Try it out here:

<a href="https://stackblitz.com/edit/github-wxgykc?file=src%2Fpages%2Findex.astro">
  <img height="32" src="https://astro.new/open-in-stackblitz.svg"/>
</a>




&nbsp;  
<!--########################################################################-->
# Installation
<!--########################################################################-->

### NPM

```bash
npm install lazy-portal
```

### index.html

```html
<head>
  <script type="module" src="lazy-portal/Client/Initialize.js"/>
  <link rel="stylesheet" href="lazy-portal/Assets/Style.css"/>
</head>
```

* update the `lazy-portal` paths appropriately based on how they need to be resolved for your particular build configuration.




&nbsp;  
<!--########################################################################-->
# Usage
<!--########################################################################-->

Use `portal-entrance` components to wrap the content that you want to be transported, and `portal-destination` components to define where the content will be transported.

### Example

```html
<portal-entrance to="MyPortal">
  <h1>My Portal Content</h1>
</portal-entrance>

<portal-destination name="MyPortal">
  {/* portal content will be rendered here! */}
</portal-destination>
```




&nbsp;  
<!--########################################################################-->
# API
<!--########################################################################-->


## `<portal-entrance/>`

### `to`
```yaml
`name` of target `portal-destination`.

- Type:     string
- Required: true
```

### `name`
```yaml
Unique identifier, defaults to the provided `to` value.

Will require an explicit unique value when the target destination's
  `transfer-mode` is set to "Multiple"`.

- Type:     string
- Required: false
```

### `position`
```yaml
Determines the position that the portal content will render to
  in the `portal-destination`.

- Type:     (number | "First" | "Last")
- Required: false
```



&nbsp;  
## `<portal-destination/>`

### `name`
```yaml
Unique identifier.

- Type:     string
- Required: true
```

### `transfer-mode`
```yaml
When set to "Single", an error will be thrown if more than one
  `portal-entrance` attempts to transfer its contents.
  
When set to "Multiple", there is no limitation of portal content transfers.

- Type:     ("Single" | "Multiple")
- Required: false
- Default:  "Single"
```

### `unmount-mode`
```yaml
When set to "Destroy", the portal contents will be destroyed
  when the destination is unmounted.
  
When set to "Persist", the portal contents will be transferred
  back to the (hidden) `portal-entrance` when the destination is unmounted.
If the destination is remounted, the existing portal contents
  will be transferred without requiring them to be rendered again.

- Type:     ("Destroy" | "Persist")
- Required: false
- Default:  "Persist"
```

### `default-position`
```yaml
Determines the position that portal content will be rendered to,
  when an explicit `position` property has not been set on a `portal-entrance`.

- Type:     ("First" | "Last")
- Required: false
- Default:  "Last"
```




&nbsp;  
<!--########################################################################-->
# How It Works
<!--########################################################################-->

`portal-entrance` components are rendered to `body > portal-root`, which is hidden via `display:none`.

`portal-destination` components render at their point of definition.

The `portal-entrance` and corresponding `portal-destination` can be rendered in any order, and the transfer will be initiated as soon as both exist. Portal contents are transferred to the destination via a generated `portal-transport` component. From this point forward, the transport is used to move the contents between the entrance & destination.

Resource tags [`link`, `script`, etc.] are excluded from the transport, and are stored in their original point of entry within `portal-root`. This prevents style flashes & duplicate script execution.
