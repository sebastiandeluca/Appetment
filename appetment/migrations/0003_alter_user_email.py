# Generated by Django 3.2.6 on 2021-11-11 04:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appetment', '0002_auto_20211110_2350'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(blank=True, max_length=254, verbose_name='email address'),
        ),
    ]
