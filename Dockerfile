# Image de base : Python 3.12, version "slim" (allégée, sans outils superflus)
FROM python:3.12-slim

# Dossier de travail à l'intérieur du conteneur
WORKDIR /app

# Copie uniquement le fichier des dépendances d'abord (voir explication ci-dessous)
COPY requirements.txt .

# Installe les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Copie le reste du code de l'application
COPY . .

# Documente le port utilisé par Flask (informatif, n'ouvre rien tout seul)
EXPOSE 5000

# Variables d'environnement pour Flask
ENV FLASK_APP=run.py
ENV FLASK_RUN_HOST=0.0.0.0

# Commande exécutée au démarrage du conteneur
CMD ["flask", "run"]