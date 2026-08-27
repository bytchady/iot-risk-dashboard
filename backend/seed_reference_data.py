from app import create_app, db
from app.models import RiskFactor, RiskClassification

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
                db.session.add(RiskClassification(label=label, min_score=low, max_score=high, color=color))

        db.session.commit()
        print("Reference data seeded.")

if __name__ == "__main__":
    seed()