# Tchoua App Starter

Starter officiel pour développer une application web Tchoua, avec ou sans build.

## Démarrage

```bash
python3 -m http.server 3000
# ouvrir http://localhost:3000
```

## Intégration Tchoua

1. Modifiez `manifest.json` : `slug`, `name`, `scope`, `entryUrl` et `permissions`.
2. Installez l'app depuis **Apps marketplace**.
3. Tchoua ouvre votre `entryUrl` avec `?tchoua_token=…`.
4. Lisez le contexte :

```js
const token = new URLSearchParams(location.search).get("tchoua_token");
const res = await fetch("https://www.tchoua.com/api/apps/sdk/context", {
  headers: { Authorization: `Bearer ${token}` }
});
const { context } = await res.json();
```

Le jeton est signé côté serveur, valable 30 minutes, et contient `appId`, `userId`,
`associationId`, `scope` et `installationId`.

## Structure

- `index.html` — interface et pont SDK.
- `manifest.json` — contrat de l'app.
- `README.md` — ce guide.

## Publier

Soumettez votre manifest via `POST /api/apps/submit`. Une app reste en brouillon
jusqu'à validation par l'administration Tchoua.

Licence MIT.

## SDK et composants

- `sdk/tchoua-sdk.js` : helpers ESM pour lire le contexte, signaler le chargement et écouter les messages de la plateforme.
- `components/tchoua-components.css` : boutons, cartes, champs, badges et états de contexte.

Les apps peuvent utiliser ces fichiers directement ou les adapter à leur framework.
