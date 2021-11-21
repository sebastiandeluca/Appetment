# Appetment - CS50w Capstone Project by sebastiandeluca

### What is Appetment?
Appetment is a concept for a service that allows you to create profiles for your pets and quickly send out requests to all nearby approved veterinary clinics for an appointment when necessary. Although typically, people find one Vet that they like and go to that vet, there are situations where a service like this could be useful, like if you are worried your pet has an affliction like fleas, or ear mites and urgently want to get them to a vet. 
### Functionality (Features)
#### Accounts
Naturally, as with most services, you are able to create an account that houses your personal information. This account is required to use to service. If not signed in, you see the landing page only. Once signed in, you have access to the service itself. You provide an email, password, postal code, and first & last name. If the service were to be implemented in reality, a mobile app of this service would require location services.

When you sign up, you are only asked for your email and a password. You go to the page where you edit your profile in order to provide the other information.


#### Pet Profiles
A pet profile is essentially all of your pet's information that a vet would need. You provide your pet's name, their type (cat, dog, bird, etc.), their breed, their age and any previous afflictions they may have, and it is saved to the database and can be retrieved by the service when you request an appointment. When viewing the pet's profile, you are able to edit it and add a link to a picture of them as a 'profile picture'. You are able to edit and delete these profiles at your whim, and these profiles are per-account, meaning that other accounts can't see your pet profiles and you can't see other account's pet profiles. Every appointment you make for a pet is saved to their profile so you can easily access information like the last time your pet visited the vet.
#### Appointment Maker
The concept here is that you make an appointment for your pet through the service, and your pet's information is sent to all nearby approved veterinary clinics. Then, once a clinic has accepted your appointment, you are sent an SMS-Text message informing you that your appointment has been accepted, and the text will have all the information about the appointment, like the time, place, and vet who will be helping you. Unfortunately, this is merely the CONCEPT for it. The reality of this is, you make an appointment and then the appointment is saved to the database and added to your pet's profile, and you are informed that the appointment has been made.

When making an appointment, you select a pet profile that you've created. Afterward, you then describe what the reason for the visit to vet is, and can mark the appointment as urgent. Non-urgent appointments are typically just checkups and whatnot. In a real-world application, appointments marked as urgent would have priority over non-urgent ones in regards to which ones veterinarians would accept first. 



### Distinctiveness and Complexity:
This project, Appetment, is unique from all other projects done in the CS50w course because it has no commerce component, isn't an informational database, has no social-networking aspect to it, and is not a mailing service.
Beyond that, Appetment is meant to be a service that allows you to create profiles for your pets and request vet appointments (hence the aPETment name) that are, through the app, automatically sent out to all nearby approved veterinary clinics. Since this is more of a concept-project rather than an actual developed veterinary service, the functionality to actually send the information to nearby clinics is not included, but it pretends it does. This is what sets Appetment apart from the other CS50w projects.

### Requirements Met
- Appetment is distinct from all other CS50w projects and I feel as if it is more, if not equally, complex.
- JavaScript is heavily utilized on the front-end of the application.
- Django is utilized on the back-end of the application. There are three models: User Accounts, Pet Profiles and Appointments.
- Appetment is mobile-responsive.

### Created Files and Explanation:
#### HTML
Index.html: This houses the HTML for the 'landing page' of the service. This is the page you see if not signed in. It provides information about the company and the service it provides.

Layout.html: This houses the HTML for the page that serves as the layout for all pages you'd visit on the site regardless of if you're signed in.

Login.html: This houses the HTML for the page that allows you to sign in to your account.

Register.html: This houses the HTML for the page that allows you to create an account.

Main.html: This houses the HTML for the page that allows you to access Appetment's services, like creating pet profiles and making appointments, as well as will remind you about things that are important for your pet's wellbeing.

#### CSS
styles.css: This is the CSS styling file for desktop devices visiting the page. Created because it adds style to the page.

mobile-styles.css: This is the CSS styling file for mobile devices visiting the page. This seemed easier to me than integrating mobile CSS into the standard CSS file.

#### JavaScript
appetment.js: The JS file that gives the site its functionality, like the ability to login, logout, register, create a profile, make an appointment, edit a profile, etc. I created a separate JavaScript file rather than inline scripting in the HTML because I felt it was cleaner and more convenient.

#### Miscellaneous
Metropolis-Bold.otf, Metropolis-Light.otf, Metropolis-Medium.otf, Metropolis-Regular.otf: This are the .otf files for the custom font I use in the site. I use a custom font because I don't like the provided fonts and I felt as if the font I chose better fit the style of service I was making.


#### How to Run
Navigate to the 'capstone' directory (NOTE: '*/Capstone/capstone/) and open a terminal window in the folder. 

From this, run the command 'python manage.py runserver' and visit the provided link.

This will bring you to landing page. As mentioned before, in order to access the service itself, you need to create an account. Think of it like Uber, how you can't access the service in any way without an account. (Attempting to do so results in a 404 error.)


#### Additional Information
As the test video has information regarding my actual cats, the database will be empty when it is downloaded. Luckily, creating pet profiles and appointments is easy. ;)
