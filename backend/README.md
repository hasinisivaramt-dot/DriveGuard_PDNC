# backend/

FastAPI service — built in Phase 7 of the roadmap.

Will contain:
- `app/main.py` — FastAPI entrypoint
- `app/routers/` — auth, vehicles, sensor_readings, predictions, maintenance, admin
- `app/models/` — Pydantic schemas
- `app/services/` — inference service that loads trained models from ../models/
- `app/db/` — MongoDB connection (Motor/PyMongo)
- JWT-based auth for the three portals (user, engineer, admin)
