# Generated by Django 5.1.2 on 2025-01-15 16:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notification', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='message',
            field=models.TextField(blank=True),
        ),
    ]
