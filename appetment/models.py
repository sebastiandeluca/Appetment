from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    first_name = models.TextField(default="")
    last_name = models.TextField(default="")
    password = models.TextField(default="")
    petprofiles = models.TextField(default="")
    postal_code =  models.TextField(default="")

    def serialize(self):
        return {
            "id":self.id,
            "name": self.first_name,
            "surname": self.last_name,
            "postal":self.postal_code
        }

class PetProfile(models.Model):
    pet_owner = models.TextField(default="")
    pet_name = models.TextField(default="")
    pet_type = models.TextField(default="")
    pet_breed = models.TextField(default="")
    pet_illnesses = models.TextField(default="")
    pet_appointments = models.TextField(default="")
    pet_image = models.URLField(default="https://lh3.googleusercontent.com/4QEa2v4huepda_QVp8eg0uWw2XyB1KCQ54JmrD5KAdhdzn5SoBesFkYxvzZtPrt2BEdLTM1tWcOZJk5g2HTnVgZT948PsJlWVqeXUTVJFE3DAaaqhiS-L7TaPSuHz3qnwGqMzQ2p_WkSejHfxzNsq9AH7cPw48jYC9fJ1fIwRWANXPrQ-J_x81kOtBsmGhKncQmdxyz5IYNo1jSREGek8bMnYMG0ghWolSKjFZwbMWhE-zTKRyg9HFcBbnZpwe0WMtgFA5Hs21sZ_YPo-7op46k2D61PnsYww2wLvFwOD1vvGSQMvYTk3RadpeIZuAX9qBiF8gj3IFhh4aWn5e34jVfTsoYOTU7mWU7tgdmkJ1fn8W6vOemWpTdSoRhAzOcjG0AZKvvg6OBuqehKdxMTmGDmeSEfqUPa2gk0yPPtOqO-4XAURG3h1a4g4TiSo2jdGFqIANHIs8pf7_xMrjsFaR1AIcijulViqx-cPpETyqB92tf-d9TA9M7gkTirElSEWzaPSwybkG03X1EzfUJY1OYCuWSeqjFAFpXG0mX8VWFRNUW2dkUFPvwsJna9lVlZ1KF3PXv86zi0WbB4PCLUqXuazAKaP8u01MCqAyjMgzbMWnD3O5rLA1gYKS2OljhZJYYw_YONQ7kZb3PTSBCA97c2mUYbZXb-1fjkQZGefP8ynVcMhMRizjzg5g4tCGK3f7AK4tCYFRqvPEJfR7lQKUs=s300-no?authuser=0")
    pet_age = models.IntegerField(default="1")
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.pet_name,
            "type": self.pet_type,
            "breed": self.pet_breed,
            "illnesses": self.pet_illnesses,
            "appointments": self.pet_appointments,
            "image": self.pet_image,
            "age": self.pet_age,
            "owner": self.pet_owner
        }

class VetAppointment(models.Model):
    pet_profile_given = models.TextField(default="")
    reason_for_visit =  models.TextField(default="")
    appointment_urgency = models.BooleanField(default=False)
    appointment_date = models.DateTimeField(auto_now_add=True)
    accepted = models.BooleanField(default=False)

    def serialize(self):
        return {
            "id": self.id,
            "pet": self.pet_profile_given,
            "reason": self.reason_for_visit,
            "urgency": self.appointment_urgency,
            "accepted": self.accepted,
            "timestamp": self.appointment_date
        }