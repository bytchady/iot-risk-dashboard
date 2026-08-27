from app import create_app, db
from app.models import RiskFactor, RiskClassification

"""
Purpose:
    One-off script that populates the two reference tables required by the
    risk scoring model: RiskFactor (the 7 factors from the conference paper,
    each with its weight) and RiskClassification (the 3 score bands: Low,
    Medium, High, with their thresholds and display color).

    These tables are configuration data for the scoring model itself, not
    user-created content, so they are not exposed through a POST route in
    the dashboard — this script is the only way they get created.

Docker command to run it (container must already be up via `docker compose up`):
    docker compose exec backend python seed_reference_data.py

    `docker compose exec` runs a one-off command inside the already-running
    `backend` container, using the same Flask app context (config, DB
    connection) the running app uses — required here because the script
    calls create_app().

When to use it:
    - Once, right after the initial `flask db upgrade` that creates the
      database schema for the first time.
    - Again any time the database is reset or recreated from scratch, e.g.
      after `docker compose down -v` (which also removes volumes, and
      therefore the SQLite data).
    Safe to re-run at any time: the count() == 0 checks below make it
    idempotent, so re-running it on a database that's already seeded does
    nothing instead of creating duplicates.
"""

FACTORS = [
    ("Data type", "Nature of the data collected (environmental to biometric)"),
    ("Sensitivity", "Inferential value on occupant activity"),
    ("Identifiability", "Ability to link data to an individual"),
    ("Location tracking", "Spatial precision of captured data"),
    ("Frequency of collection", "How often data is captured"),
    ("Access control", "Who can access the collected data"),
    ("Data sharing", "Whether data is shared beyond the collecting system"),
]

CLASSIFICATIONS = [
    ("Low", 0, 33, "green"),
    ("Medium", 34, 66, "orange"),
    ("High", 67, 100, "red"),
]

def seed():
    app = create_app()
    with app.app_context():
        if RiskFactor.query.count() == 0:
            for name, description in FACTORS:
                db.session.add(RiskFactor(name=name))

        if RiskClassification.query.count() == 0:
            for label, low, high, color in CLASSIFICATIONS:
                db.session.add(RiskClassification(label=label, score_min=low, score_max=high, color=color))

        db.session.commit()
        print("Reference data seeded.")

if __name__ == "__main__":
    seed()