FROM python:3.10-slim

WORKDIR /auth-service

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

EXPOSE 5050
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "5050"]