# Generated by Django 5.0.9 on 2024-11-24 16:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_paper_rename_ownerid_payment_history_owner_id_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='RequestLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('scheduled_time', models.DateTimeField()),
                ('processed', models.BooleanField(default=False)),
            ],
        ),
    ]
