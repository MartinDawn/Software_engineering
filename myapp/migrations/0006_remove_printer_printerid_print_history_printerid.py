# Generated by Django 5.0.9 on 2024-11-27 00:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0005_printer_printerid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='printer',
            name='PrinterId',
        ),
        migrations.AddField(
            model_name='print_history',
            name='PrinterId',
            field=models.CharField(default='', max_length=255),
        ),
    ]