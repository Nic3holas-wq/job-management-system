# Dockerfile
FROM python:3.12

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /main

COPY requirements.txt /main/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . /main/
