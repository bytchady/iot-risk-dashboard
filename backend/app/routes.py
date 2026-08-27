from datetime import datetime

from flask import Blueprint, jsonify, request

from app import db
from app.models import (
    Device,
    DeviceType,
    BmsSubsystem,
    RiskFactor,
    RiskClassification,
    DeviceFactorScore,
    RiskScoreHistory,
    DeviceDataSample,
)

main = Blueprint("main", __name__)


@main.route("/")
def index():
    return jsonify({"message": "API du tableau de bord de risques IoT opérationnelle"})


# ---------- SUBSYSTEMS ----------

@main.route("/api/subsystems", methods=["GET"])
def get_subsystems():
    subsystems = BmsSubsystem.query.all()
    return jsonify([{"id_subsystem": s.id_subsystem, "name": s.name} for s in subsystems])


@main.route("/api/subsystems", methods=["POST"])
def create_subsystem():
    data = request.get_json()
    if not data or "name" not in data:
        return jsonify({"error": "Champ requis : name"}), 400

    nouveau = BmsSubsystem(name=data["name"])
    db.session.add(nouveau)
    db.session.commit()
    return jsonify({"id_subsystem": nouveau.id_subsystem, "name": nouveau.name}), 201


# ---------- DEVICE TYPES ----------

@main.route("/api/device-types", methods=["GET"])
def get_device_types():
    types = DeviceType.query.all()
    return jsonify(
        [
            {
                "id_device_type": t.id_device_type,
                "name": t.name,
                "primary_data_collected": t.primary_data_collected,
                "id_subsystem": t.id_subsystem,
            }
            for t in types
        ]
    )


@main.route("/api/device-types", methods=["POST"])
def create_device_type():
    data = request.get_json()
    if not data or "name" not in data or "id_subsystem" not in data:
        return jsonify({"error": "Champs requis : name, id_subsystem"}), 400

    subsystem = BmsSubsystem.query.get(data["id_subsystem"])
    if subsystem is None:
        return jsonify({"error": "id_subsystem invalide"}), 400

    nouveau = DeviceType(
        name=data["name"],
        id_subsystem=data["id_subsystem"],
        primary_data_collected=data.get("primary_data_collected"),
    )
    db.session.add(nouveau)
    db.session.commit()
    return jsonify(
        {
            "id_device_type": nouveau.id_device_type,
            "name": nouveau.name,
            "primary_data_collected": nouveau.primary_data_collected,
            "id_subsystem": nouveau.id_subsystem,
        }
    ), 201


# ---------- DEVICES ----------

@main.route("/api/devices", methods=["GET"])
def get_devices():
    devices = Device.query.all()
    return jsonify(
        [
            {
                "id_device": d.id_device,
                "name": d.name,
                "created_at": d.created_at.isoformat() if d.created_at else None,
                "id_device_type": d.id_device_type,
            }
            for d in devices
        ]
    )


@main.route("/api/devices/<string:id_device>", methods=["GET"])
def get_device(id_device):
    device = Device.query.get(id_device)
    if device is None:
        return jsonify({"error": "Appareil introuvable"}), 404

    return jsonify(
        {
            "id_device": device.id_device,
            "name": device.name,
            "created_at": device.created_at.isoformat() if device.created_at else None,
            "id_device_type": device.id_device_type,
        }
    )


@main.route("/api/devices", methods=["POST"])
def create_device():
    data = request.get_json()
    if not data or "name" not in data or "id_device_type" not in data:
        return jsonify({"error": "Champs requis : name, id_device_type"}), 400

    device_type = DeviceType.query.get(data["id_device_type"])
    if device_type is None:
        return jsonify({"error": "id_device_type invalide"}), 400

    nouveau = Device(
        name=data["name"],
        id_device_type=data["id_device_type"],
        created_at=datetime.utcnow(),
    )
    db.session.add(nouveau)
    db.session.commit()
    return jsonify({"id_device": nouveau.id_device, "name": nouveau.name}), 201


@main.route("/api/devices/<string:id_device>", methods=["PUT"])
def update_device(id_device):
    device = Device.query.get(id_device)
    if device is None:
        return jsonify({"error": "Appareil introuvable"}), 404

    data = request.get_json()
    if "name" in data:
        device.name = data["name"]
    if "id_device_type" in data:
        device.id_device_type = data["id_device_type"]

    db.session.commit()
    return jsonify({"id_device": device.id_device, "name": device.name})


@main.route("/api/devices/<string:id_device>", methods=["DELETE"])
def delete_device(id_device):
    device = Device.query.get(id_device)
    if device is None:
        return jsonify({"error": "Appareil introuvable"}), 404

    db.session.delete(device)
    db.session.commit()
    return jsonify({"message": "Appareil supprimé"}), 200


# ---------- RISK FACTORS ----------

@main.route("/api/risk-factors", methods=["GET"])
def get_risk_factors():
    factors = RiskFactor.query.all()
    return jsonify(
        [{"id_factor": f.id_factor, "name": f.name, "dimension": f.dimension} for f in factors]
    )


@main.route("/api/risk-factors", methods=["POST"])
def create_risk_factor():
    data = request.get_json()
    if not data or "name" not in data or "dimension" not in data:
        return jsonify({"error": "Champs requis : name, dimension"}), 400

    nouveau = RiskFactor(name=data["name"], dimension=data["dimension"])
    db.session.add(nouveau)
    db.session.commit()
    return jsonify(
        {"id_factor": nouveau.id_factor, "name": nouveau.name, "dimension": nouveau.dimension}
    ), 201


# ---------- RISK CLASSIFICATIONS ----------

@main.route("/api/risk-classifications", methods=["GET"])
def get_risk_classifications():
    classifications = RiskClassification.query.all()
    return jsonify(
        [
            {
                "id_classification": c.id_classification,
                "label": c.label,
                "score_min": c.score_min,
                "score_max": c.score_max,
                "color": c.color,
            }
            for c in classifications
        ]
    )


@main.route("/api/risk-classifications", methods=["POST"])
def create_risk_classification():
    data = request.get_json()
    required = ["label", "score_min", "score_max", "color"]
    if not data or any(field not in data for field in required):
        return jsonify({"error": f"Champs requis : {', '.join(required)}"}), 400

    nouveau = RiskClassification(
        label=data["label"],
        score_min=data["score_min"],
        score_max=data["score_max"],
        color=data["color"],
    )
    db.session.add(nouveau)
    db.session.commit()
    return jsonify(
        {
            "id_classification": nouveau.id_classification,
            "label": nouveau.label,
            "score_min": nouveau.score_min,
            "score_max": nouveau.score_max,
            "color": nouveau.color,
        }
    ), 201


# ---------- DEVICE FACTOR SCORES ----------

@main.route("/api/device-factor-scores", methods=["GET"])
def get_device_factor_scores():
    scores = DeviceFactorScore.query.all()
    return jsonify(
        [
            {
                "id_device_factore_score": s.id_device_factore_score,
                "rating": s.rating,
                "rated_at": s.rated_at.isoformat() if s.rated_at else None,
                "id_device": s.id_device,
                "id_factor": s.id_factor,
            }
            for s in scores
        ]
    )


@main.route("/api/device-factor-scores", methods=["POST"])
def create_device_factor_score():
    data = request.get_json()
    if not data or "rating" not in data or "id_device" not in data or "id_factor" not in data:
        return jsonify({"error": "Champs requis : rating, id_device, id_factor"}), 400

    if Device.query.get(data["id_device"]) is None:
        return jsonify({"error": "id_device invalide"}), 400
    if RiskFactor.query.get(data["id_factor"]) is None:
        return jsonify({"error": "id_factor invalide"}), 400

    nouveau = DeviceFactorScore(
        rating=data["rating"],
        id_device=data["id_device"],
        id_factor=data["id_factor"],
        rated_at=datetime.utcnow(),
    )
    db.session.add(nouveau)
    db.session.commit()
    return jsonify(
        {
            "id_device_factore_score": nouveau.id_device_factore_score,
            "rating": nouveau.rating,
        }
    ), 201


# ---------- RISK SCORE HISTORY (lecture + création uniquement, jamais de modification) ----------

@main.route("/api/risk-score-history", methods=["GET"])
def get_risk_score_history():
    history = RiskScoreHistory.query.all()
    return jsonify(
        [
            {
                "id_history": h.id_history,
                "raw_score": float(h.raw_score) if h.raw_score is not None else None,
                "normalized_score": float(h.normalized_score) if h.normalized_score is not None else None,
                "computed_at": h.computed_at.isoformat() if h.computed_at else None,
                "id_device": h.id_device,
                "id_classification": h.id_classification,
            }
            for h in history
        ]
    )


@main.route("/api/risk-score-history", methods=["POST"])
def create_risk_score_history():
    data = request.get_json()
    required = ["raw_score", "normalized_score", "id_device", "id_classification"]
    if not data or any(field not in data for field in required):
        return jsonify({"error": f"Champs requis : {', '.join(required)}"}), 400

    if Device.query.get(data["id_device"]) is None:
        return jsonify({"error": "id_device invalide"}), 400
    if RiskClassification.query.get(data["id_classification"]) is None:
        return jsonify({"error": "id_classification invalide"}), 400

    nouveau = RiskScoreHistory(
        raw_score=data["raw_score"],
        normalized_score=data["normalized_score"],
        id_device=data["id_device"],
        id_classification=data["id_classification"],
        computed_at=datetime.utcnow(),
    )
    db.session.add(nouveau)
    db.session.commit()
    return jsonify({"id_history": nouveau.id_history}), 201


# ---------- DEVICE DATA SAMPLES (lecture + création uniquement) ----------

@main.route("/api/device-data-samples", methods=["GET"])
def get_device_data_samples():
    samples = DeviceDataSample.query.all()
    return jsonify(
        [
            {
                "id_sample": s.id_sample,
                "captured_at": s.captured_at.isoformat() if s.captured_at else None,
                "data_value": s.data_value,
                "id_device": s.id_device,
            }
            for s in samples
        ]
    )


@main.route("/api/device-data-samples", methods=["POST"])
def create_device_data_sample():
    data = request.get_json()
    if not data or "data_value" not in data or "id_device" not in data:
        return jsonify({"error": "Champs requis : data_value, id_device"}), 400

    if Device.query.get(data["id_device"]) is None:
        return jsonify({"error": "id_device invalide"}), 400

    nouveau = DeviceDataSample(
        data_value=data["data_value"],
        id_device=data["id_device"],
        captured_at=datetime.utcnow(),
    )
    db.session.add(nouveau)
    db.session.commit()
    return jsonify({"id_sample": nouveau.id_sample, "data_value": nouveau.data_value}), 201