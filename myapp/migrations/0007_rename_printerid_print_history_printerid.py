# Generated by Django 5.0.9 on 2024-11-27 00:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0006_remove_printer_printerid_print_history_printerid'),
    ]

    operations = [
        migrations.RenameField(
            model_name='print_history',
            old_name='PrinterId',
            new_name='printerId',
        ),
    ]