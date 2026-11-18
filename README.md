# Parla Subito

App para aprender italiano rápido (hablar, entender, memorizar), pensada para la vida en Calabria.

**Abrir:** https://ellocoelye.github.io/parla-subito/
En el iPhone: abrila en Safari → Compartir → **Agregar a inicio**.

## Primer uso
1. Ajustes (la **L** en Inicio) → **Motor de IA**: pegá tu clave gratis de **Gemini** (aistudio.google.com → Get API key) y, de respaldo, la de **Groq** (console.groq.com → API Keys). Las claves quedan solo en tu teléfono.
2. Ajustes → **Pegar**: pegá el progreso que copiaste desde la versión anterior.

## Cómo está hecha
- Una sola página (`index.html`), sin servidor. El progreso se guarda en el dispositivo; en Ajustes → **Copiar** hacés una copia de seguridad.
- `shim.js`: IA (Gemini Flash-Lite para lo diario, Flash para lo más exigente, Groq como respaldo automático) y reconocimiento de voz del navegador.
- `src/`: código fuente. `python3 build.py && python3 gh_build.py` regenera la página.
