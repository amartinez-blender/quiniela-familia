# Quiniela Familia

Dashboard estático para seguir la quiniela familiar del Mundial 2026: ranking, selecciones clasificadas, tablas reales, mejores terceros y partidos. Construido con React, Vite, TypeScript y Tailwind CSS.

## Ejecutar localmente

Requiere Node.js 20 o superior.

```bash
npm install
cp .env.example .env
npm run dev
```

Comandos disponibles:

```bash
npm run dev
npm run test
npm run build
npm run preview
```

## Variables de entorno

| Variable | Descripción | Default |
| --- | --- | --- |
| `VITE_API_BASE_URL` | URL base de la API | `https://worldcup26.ir` |
| `VITE_API_TOKEN` | JWT opcional; se envía como Bearer token | vacío |
| `VITE_BASE_PATH` | Base pública de Vite | `/` |
| `VITE_DEMO_MODE` | Fuerza el respaldo local | `false` |

La app enlaza `/get/groups`, `/get/teams` y `/get/games`. Si la fuente no responde, usa automáticamente el último corte real guardado en `src/data/mockApi.ts`. Las respuestas válidas se guardan 60 segundos en `localStorage`.

## Puntuación

Cada selección que esté actualmente en zona de clasificación suma 1 punto. Esto incluye los dos primeros de cada grupo y los ocho mejores terceros. No hay bonos ni puntos por posición exacta.

La regla se edita en `SCORING_RULES`, dentro de `src/logic/scoring.ts`; la lógica no vive en componentes visuales.

## GitHub Pages

El workflow en `.github/workflows/deploy.yml` compila y publica automáticamente cada push a `main`. En GitHub activa **Settings → Pages → Source: GitHub Actions**.

Si el nombre del repositorio cambia, ajusta `VITE_BASE_PATH` en el workflow. Para este proyecto está configurado como `/quiniela-familia/`.

## Arquitectura

- `src/services/worldCupApi.ts`: API, autenticación, caché y fallback.
- `src/logic`: normalización, standings, clasificación y scoring.
- `src/data`: predicciones, aliases y último corte real de respaldo.
- `src/components`: interfaz del dashboard.
