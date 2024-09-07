# Generated by Django 5.1 on 2024-09-01 23:22

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("app", "0001_initial_migration"),
    ]

    operations = [
        migrations.CreateModel(
            name="Client",
            fields=[
                (
                    "client_id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("client_date", models.DateTimeField(auto_now_add=True)),
                ("name", models.CharField(max_length=40)),
                ("email", models.EmailField(max_length=64)),
                ("password", models.CharField(max_length=256)),
               
            ],
        ),
        migrations.CreateModel(
            name="CsvImport",
            fields=[
                ("import_id", models.AutoField(primary_key=True, serialize=False)),
                ("csv_import_date", models.DateTimeField(auto_now_add=True)),
                ("type_import", models.IntegerField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "client",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="app.client"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="CsvData",
            fields=[
                (
                    "csv_id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("date_time", models.DateTimeField()),
                ("balance", models.FloatField()),
                ("equity", models.FloatField()),
                ("deposit", models.FloatField()),
                (
                    "import_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="app.csvimport"
                    ),
                ),
            ],
        ),
    ]
