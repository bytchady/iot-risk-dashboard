from app.models import DeviceFactorScore, RiskClassification


class IncompleteScoringDataError(Exception):
    """Raised when a device does not have a score for each of the 7 factors."""
    pass


def compute_raw_score(id_device):
    scores = DeviceFactorScore.query.filter_by(id_device=id_device).all()

    if len(scores) != 7:
        raise IncompleteScoringDataError(
            f"Device {id_device} must have scores for all 7 risk factors."
        )

    WEIGHT = 1 / 7

    weighted_sum = sum(WEIGHT * s.rating for s in scores)

    # S(d) = weighted sum of s_i(d), formula from the conference paper
    raw_score = weighted_sum

    return raw_score


def normalize_score(raw_score):
    # S_norm(d) = (S(d) - 1) / 2 * 100
    return (raw_score - 1) / 2 * 100


def classify_score(normalized_score):
    classification = RiskClassification.query.filter(
        RiskClassification.score_min <= normalized_score,
        RiskClassification.score_max >= normalized_score
    ).first()

    if classification is None:
        raise ValueError(
            f"No classification band found for score {normalized_score}"
        )

    return classification


def compute_device_risk(id_device):
    """Returns (raw_score, normalized_score, classification) for a device."""
    raw = compute_raw_score(id_device)
    normalized = normalize_score(raw)
    classification = classify_score(normalized)

    return raw, normalized, classification