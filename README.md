# Azzurro di Mare — Case Study

Azzurro di Mare è un caso studio frontend dedicato a un ristorante di pesce
fittizio, ambientato nel contesto costiero tra Anzio e Nettuno.

Il progetto mostra come strutturare un sito vetrina per un'attività locale con
attenzione a UX, accessibilità, SEO tecnico e locale, performance e qualità dei
contenuti.

> **Nota demo:** il ristorante è fittizio e non accetta prenotazioni reali. Il
> form di prenotazione è una simulazione e non invia né salva dati.

## Obiettivi

- Progettare percorsi chiari e leggibili da mobile.
- Applicare HTML semantico e requisiti di accessibilità.
- Preparare metadata, sitemap e robots per la SEO tecnica.
- Trattare la SEO locale senza inventare dati commerciali.
- Mantenere un output statico leggero e performante.
- Presentare contenuti credibili per un'attività locale.
- Realizzare un form demo accessibile con validazione e gestione del focus.

## Stack

- Astro con output statico
- Vue 3, usato esclusivamente per il form di prenotazione demo
- JavaScript e CSS vanilla
- `astro:assets` per le immagini responsive
- `@astrojs/sitemap`
- Deploy statico previsto su Vercel

## Pagine

- `/` — Home
- `/menu/` — Menu demo
- `/ristorante/` — Il ristorante
- `/location/` — Contesto locale
- `/prenotazione/` — Prenotazione demo
- `/caso-studio/` — Documentazione del caso studio
- `/crediti-immagini/` — Fonti e crediti
- `/note-demo-privacy/` — Trasparenza demo e privacy

## Accessibilità

Il sito usa HTML semantico, un solo `h1` per pagina, skip link, landmark,
focus visibile, contrasto verificato, target touch adeguati e testi alternativi
per le immagini. Il form Vue include label associate, fieldset, messaggi di
errore collegati, `aria-live` e gestione del focus dopo validazione e conferma.

È presente il supporto a `prefers-reduced-motion`. L'audit Lighthouse locale
riporta un punteggio Accessibility di 100 su tutte le route.

## SEO E SEO Locale

Ogni pagina dispone di title e description unici, canonical coerente e Open
Graph di base. Il progetto include `robots.txt`, sitemap e contenuti HTML reali,
senza keyword stuffing.

Anzio e Nettuno sono usati esclusivamente come contesto narrativo e
professionale del caso studio. Non vengono inventati indirizzo, telefono,
orari, mappa, Google Business Profile o recensioni. Non sono presenti schema
`Restaurant` o `LocalBusiness`.

## Performance

Le immagini locali WebP sono elaborate tramite `astro:assets` con dimensioni
stabili, `srcset`, `sizes` e caricamento lazy sotto la fold. Vue è isolato nella
sola pagina `/prenotazione/`; le altre route non caricano JavaScript
applicativo. Il progetto non usa carousel, video hero o framework CSS.

### Risultati Lighthouse Locali

Risultati misurati localmente su `npm run preview` in modalità mobile. Da
riverificare dopo deploy con PageSpeed Insights.

| Route | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| `/` | 97 | 100 | 100 | 100 |
| `/menu/` | 99 | 100 | 100 | 100 |
| `/ristorante/` | 99 | 100 | 100 | 100 |
| `/location/` | 100 | 100 | 100 | 100 |
| `/prenotazione/` | 100 | 100 | 100 | 100 |
| `/caso-studio/` | 100 | 100 | 100 | 100 |
| `/crediti-immagini/` | 100 | 100 | 100 | 100 |
| `/note-demo-privacy/` | 100 | 100 | 100 | 100 |

## Immagini E Crediti

Il sito usa esclusivamente immagini locali ottimizzate. Fonti, autori e licenze
sono documentati nella pagina `/crediti-immagini/`; nessuna immagine remota
viene caricata nel markup.

## Sviluppo

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Deploy

Il progetto è pronto per un deploy statico su Vercel senza adapter:

- Framework Preset: Astro
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: default (`npm install`)
- Dominio provvisorio: `https://azzurro-di-mare-case-study.vercel.app`

Dopo il deploy, canonical, sitemap, robots e risultati PageSpeed Insights
andranno verificati sull'URL pubblico.

## Stato Progetto

Caso studio pronto per deploy e review. Non rappresenta un'attività commerciale
reale e non integra servizi di prenotazione, analytics o backend.
