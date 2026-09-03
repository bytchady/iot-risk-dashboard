import random
from app import create_app, db
from app.models import Device, RiskFactor, DeviceFactorScore, RiskScoreHistory
from app.services.risk_scoring import compute_device_risk, IncompleteScoringDataError

"""
Purpose: Populate DeviceFactorScore entries (one per risk factor, 7 total)
for every device that doesn't already have a full set of 7 scores. Uses
random but plausible ratings for now, as a placeholder until real
assessment data is available for each device.

When to use it: during development, to have enough data to test the
scoring routes and build the Angular dashboard against realistic devices
rather than a single manually-tested one.

How to run it:
    docker compose exec backend python seed_device_scores.py
"""

def seed():
    app = create_app()
    with app.app_context():
        factors = RiskFactor.query.all()
        if len(factors) != 7:
            print(f"Expected 7 RiskFactor rows, found {len(factors)}. Run seed_reference_data.py first.")
            return

        devices = Device.query.all()
        for device in devices:
            existing = DeviceFactorScore.query.filter_by(id_device=device.id_device).count()
            if existing == 7:
                continue  # already full, keep off

            for factor in factors:
                already_rated = DeviceFactorScore.query.filter_by(
                    id_device=device.id_device, id_factor=factor.id_factor
                ).first()
                if already_rated is None:
                    db.session.add(DeviceFactorScore(
                        id_device=device.id_device,
                        id_factor=factor.id_factor,
                        rating=random.choice([1, 2, 3])
                    ))

        for device in devices:
            try:
                raw, normalized, classification = compute_device_risk(device.id_device)
                db.session.add(RiskScoreHistory(
                    id_device=device.id_device,
                    raw_score=raw,
                    normalized_score=normalized,
                    id_classification=classification.id_classification
                ))
            except IncompleteScoringDataError:
                continue
        db.session.commit()
        
        print("Device factor scores seeded.")

if __name__ == "__main__":
    seed()