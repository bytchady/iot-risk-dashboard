import uuid
from datetime import datetime, timezone
from app import db


def generate_uuid():
    return str(uuid.uuid4())


class RiskFactor(db.Model):
    __tablename__ = "RISK_FACTOR"

    id_factor = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    name = db.Column(db.String(50))

    def __repr__(self):
        return f"<RiskFactor {self.name}>"


class RiskClassification(db.Model):
    __tablename__ = "RISK_CLASSIFICATION"

    id_classification = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    label = db.Column(db.String(50))
    score_min = db.Column(db.Integer)
    score_max = db.Column(db.Integer)
    color = db.Column(db.String(50))

    def __repr__(self):
        return f"<RiskClassification {self.label}>"


class BmsSubsystem(db.Model):
    __tablename__ = "BMS_SUBSYSTEM"

    id_subsystem = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    name = db.Column(db.String(50))

    device_types = db.relationship("DeviceType", backref="subsystem", lazy=True)

    def __repr__(self):
        return f"<BmsSubsystem {self.name}>"


class DeviceType(db.Model):
    __tablename__ = "DEVICE_TYPE"

    id_device_type = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    primary_data_collected = db.Column(db.String(50))
    name = db.Column(db.String(50))
    id_subsystem = db.Column(
        db.String(36), db.ForeignKey("BMS_SUBSYSTEM.id_subsystem"), nullable=False
    )

    devices = db.relationship("Device", backref="device_type", lazy=True)

    def __repr__(self):
        return f"<DeviceType {self.name}>"


class Device(db.Model):
    __tablename__ = "DEVICE"

    id_device = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    name = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    id_device_type = db.Column(
        db.String(36), db.ForeignKey("DEVICE_TYPE.id_device_type"), nullable=False
    )

    factor_scores = db.relationship("DeviceFactorScore", backref="device", lazy=True)
    score_history = db.relationship("RiskScoreHistory", backref="device", lazy=True)
    data_samples = db.relationship("DeviceDataSample", backref="device", lazy=True)

    def __repr__(self):
        return f"<Device {self.name}>"


class DeviceFactorScore(db.Model):
    __tablename__ = "DEVICE_FACTOR_SCORE"

    id_device_factore_score = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    rating = db.Column(db.Integer)
    rated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    id_device = db.Column(db.String(36), db.ForeignKey("DEVICE.id_device"), nullable=False)
    id_factor = db.Column(
        db.String(36), db.ForeignKey("RISK_FACTOR.id_factor"), nullable=False
    )

    factor = db.relationship("RiskFactor")

    def __repr__(self):
        return f"<DeviceFactorScore {self.rating}>"


class RiskScoreHistory(db.Model):
    __tablename__ = "RISK_SCORE_HISTORY"

    id_history = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    raw_score = db.Column(db.Numeric(15, 2))
    normalized_score = db.Column(db.Numeric(15, 2))
    computed_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    id_device = db.Column(db.String(36), db.ForeignKey("DEVICE.id_device"), nullable=False)
    id_classification = db.Column(
        db.String(36), db.ForeignKey("RISK_CLASSIFICATION.id_classification"), nullable=False
    )

    classification = db.relationship("RiskClassification")

    def __repr__(self):
        return f"<RiskScoreHistory {self.normalized_score}>"


class DeviceDataSample(db.Model):
    __tablename__ = "DEVICE_DATA_SAMPLE"

    id_sample = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    captured_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    data_value = db.Column(db.String(50))
    id_device = db.Column(db.String(36), db.ForeignKey("DEVICE.id_device"), nullable=False)

    def __repr__(self):
        return f"<DeviceDataSample {self.data_value}>"