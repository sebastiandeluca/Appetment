import json
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.db.models.fields import EmailField
from django.http import HttpResponse, HttpResponseRedirect
from django.http.response import JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

from .models import User, PetProfile, VetAppointment

# Create your views here.
def index(request):
    return render(request, "appetment/index.html")


def login_view(request):
    if request.method == "POST":
        
        # Attempt to sign user in
        email = request.POST["email"]
        password = request.POST["password"]
        user = authenticate(request, username=email, password=password)
        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "appetment/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "appetment/login.html")


def register(request):
    if request.method == "POST":
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "appetment/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(email, email, password)
            user.save()
        except IntegrityError as e:
            print(e)
            return render(request, "appetment/register.html", {
                "message": "Email address already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "appetment/register.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


@login_required
def main(request, user):
    print(user)
    user_data = User.objects.get(id=request.user.id)
    given_pets = user_data.petprofiles

    if len(given_pets) >= 1:
        pets = True
        pet_data = given_pets.split(",")
    else:
        pets = False
        pet_data = None
    return render(request, "appetment/main.html", {
        "pets": pets,
        "pet_data": pet_data
    })


@csrf_exempt
@login_required
def create_pet_profile(request, user):
    data = json.loads(request.body)
    pet_name = data.get("name")
    pet_type = data.get("type")
    pet_breed = data.get("breed")
    pet_age = data.get("age")
    pet_illnesses = data.get("illnesses")
    if pet_illnesses == "":
        pet_illnesses = "None"
    pet = PetProfile(
        pet_owner = user,
        pet_name = pet_name,
        pet_type = pet_type,
        pet_breed = pet_breed,
        pet_age = pet_age,
        pet_illnesses = pet_illnesses
    )
    pet.save()
    user = request.user
    user.petprofiles += (str(pet.id) + ",")
    user.save()
    return JsonResponse({"message":"Profile created successfully."})


def load_pet_profile(request, user):
    user = User.objects.get(id=user)
    profiles = []
    try:
        petprofiles = user.petprofiles.split(",")
        for pet in petprofiles:
            newpet = PetProfile.objects.get(id=pet)
            profiles.append(newpet)

    except:
        pass
    return JsonResponse([pet.serialize() for pet in profiles], safe=False)


def view_pet(request, pet):
    my_pet = PetProfile.objects.get(id=pet)
    return JsonResponse(my_pet.serialize(), safe=False) 


def edit_pet(request, pet):
    pet = PetProfile.objects.get(id=pet)
    if request.method == 'POST':
        data = json.loads((request.body))
        url = data.get("url")
        name = data.get("name")
        pType = data.get("type")
        breed = data.get("breed")
        age = data.get("age")
        illness = data.get("ill")
        pet.pet_image = url
        pet.pet_name = name
        pet.pet_type = pType
        pet.pet_breed = breed
        pet.pet_age = age
        pet.pet_illnesses = illness
        pet.save()
        return JsonResponse(pet.serialize(), safe=False)
    else:
        return JsonResponse(pet.serialize(), safe=False)


def load_appts(request, pet):
    appts = VetAppointment.objects.filter(pet_profile_given=pet)
    appts = appts.order_by("-appointment_date").all()
    return JsonResponse([visit.serialize() for visit in appts], safe=False)


@csrf_exempt
@login_required
def create_appt(request):
    user = request.user
    data = json.loads(request.body)
    pet = data.get("pet")
    urgence = data.get("urgence")
    reason = data.get("reason")
    my_pet = PetProfile.objects.get(id=pet)
    appt = VetAppointment()
    appt.pet_profile_given = pet
    appt.reason_for_visit = reason
    if urgence == 'Urgent':
        appt.appointment_urgency = True
    else:
        appt.appointment_urgency = False
    appt.accepted = False
    appt.save()
    my_pet.pet_appointments += (str(appt.id) + ",")
    my_pet.save()
    return JsonResponse({"message":"Appointment created."})

@csrf_exempt
def profile(request, user):
    user = User.objects.get(email=request.user)
    if request.method == "POST":
        data = json.loads(request.body)
        name = data.get("firstname")
        last = data.get("lastname")
        postal = data.get("post")
        user.first_name = name
        user.last_name = last
        user.postal_code = postal
        user.save()
    else:
        pass
    return JsonResponse(user.serialize(), safe=False)


def cancel_appt(request, id):
    appointment = VetAppointment.objects.get(id=id)
    stringy = str(id) + ","
    pet = appointment.pet_profile_given
    the_pet = PetProfile.objects.get(id=pet)
    appts = the_pet.pet_appointments
    appts = appts.replace(str(stringy), "")
    the_pet.pet_appointments = appts
    the_pet.save()
    appointment.delete()
    return JsonResponse({"message":"Appointment deleted."})