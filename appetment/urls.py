
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("main/<str:user>/", views.main, name="main"),

    #API Routes
    path("<str:user>/create_pet", views.create_pet_profile, name="createPet"),
    path("<str:user>/load_pets", views.load_pet_profile, name="getPets"),
    path("<int:pet>", views.view_pet, name="viewPet"),
    path("<int:pet>/edit", views.edit_pet, name="viewPet"),
    path("<int:pet>/appt", views.load_appts, name="getAppts"),
    path("makeappt", views.create_appt, name="makeAppt"),
    path("cancelappt/<str:id>", views.cancel_appt, name='cancelAppt'),
    path("<str:user>/profile", views.profile, name="profile"),
]
