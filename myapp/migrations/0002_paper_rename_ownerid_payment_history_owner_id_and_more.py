# Generated by Django 5.0.9 on 2024-11-24 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Paper',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(default='', max_length=255)),
                ('costPerPaper', models.IntegerField(default=0)),
            ],
            options={
                'db_table': 'Paper',
            },
        ),
        migrations.RenameField(
            model_name='payment_history',
            old_name='ownerId',
            new_name='owner_id',
        ),
        migrations.AddField(
            model_name='print_history',
            name='numberOfPages',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='print_history',
            name='owner_id',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='print_history',
            name='page_id',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='printer',
            name='enable_printing',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='printer',
            name='location',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='user',
            name='is_able_buying',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='print_history',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]