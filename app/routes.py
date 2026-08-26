from flask import Blueprint, jsonify, request
from app import db
from app.models import Device, DeviceType, BmsSubsystem

main = Blueprint("main", __name__)


@main.route("/")
def index():
    return jsonify({"message": "API du tableau de bord de risques IoT opérationnelle"})


# ---------- DEVICES ----------

@main.route("/api/devices", methods=["GET"])
def get_devices():
    devices = Device.query.all()
    result = [
        {
            "id_device": d.id_device,
            "name": d.name,
            "created_at": d.created_at.isoformat() if d.created_at else None,
            "id_device_type": d.id_device_type,
        }
        for d in devices
    ]
    return jsonify(result)


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

    nouveau = Device(name=data["name"], id_device_type=data["id_device_type"])
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


# ---------- DEVICE TYPES & SUBSYSTEMS (pour remplir les listes déroulantes du formulaire) ----------

@main.route("/api/device-types", methods=["GET"])
def get_device_types():
    types = DeviceType.query.all()
    return jsonify(
        [
            {
                "id_device_type": t.id_device_type,
                "name": t.name,
                "id_subsystem": t.id_subsystem,
            }
            for t in types
        ]
    )


@main.route("/api/subsystems", methods=["GET"])
def get_subsystems():
    subsystems = BmsSubsystem.query.all()
    return jsonify(
        [{"id_subsystem": s.id_subsystem, "name": s.name} for s in subsystems]
    )