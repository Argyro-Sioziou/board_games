# Generated by Django 2.1.2 on 2018-11-08 22:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('djbg', '0003_auto_20181107_1656'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='games',
        ),
        migrations.DeleteModel(
            name='Profile',
        ),
    ]
