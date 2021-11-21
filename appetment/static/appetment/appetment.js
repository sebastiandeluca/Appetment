document.addEventListener('DOMContentLoaded', function() {
    username = document.querySelector("#user-email").innerHTML;
    document.querySelector("#user-email").addEventListener('click', () => {
        edit_profile(username)
    })
    document.querySelector("#create-pet-profile").addEventListener('submit', () => {create_pet_profile(username)})
    document.querySelector("#manage-pp").addEventListener('click', () => {switch_view(true)})
    document.querySelector("#make-appt").addEventListener('click', () => {switch_view(true)})
    document.querySelector("#go-back-btn").addEventListener('click', () => {switch_view(true)})
    document.querySelector(".appointment-submit").addEventListener('click', () => {create_appointment(username)})

    switch_view(true);
    load_pets();
    load_options();
})


function switch_view(boolie) {
    if (boolie) {
        document.querySelector("#pet-profile-content-container").style.display = 'none';
        document.querySelector("#user-profile-content-container").style.display = "none";
        document.querySelector("#main-content-container").style.display = 'block';
    }
    else {
        document.querySelector("#pet-profile-content-container").style.display = 'block';
        document.querySelector("#user-profile-content-container").style.display = "none";
        document.querySelector("#main-content-container").style.display = 'none';
    }
    window.scroll(0, 0);
}

function edit_profile(username) {
    window.scrollTo(0, 263);
    document.querySelector("#pet-profile-content-container").style.display = 'none';
    document.querySelector("#main-content-container").style.display = 'none';
    document.querySelector("#pet-profile-content-container").style.display = 'none';
    document.querySelector('#user-profile-content-container').style.display = 'block';
    document.querySelector("#user-name").style.display = "block";
    document.querySelector("#postal").style.display = "block";
    document.querySelector("#edit-user-profile-btn").style.display = "block";
    document.querySelector("#edit-prompt").style.display = "block";
    displayer = document.querySelector("#user-profile-info");
    fetch(`/${username}/profile`)
    .then(response => response.json())
    .then(profile => {
        document.querySelector("#edit-user-profile-btn").addEventListener('click', () => {
            try {
                document.querySelector("#user-name").remove()
                document.querySelector("#postal").remove()
            }
            catch (TypeError) {
            }
            document.querySelector("#edit-user-profile").style.display = "block";
            document.querySelector("#edit-prompt").innerHTML = "Want to Save Changes?";
            document.querySelector("#edit-user-profile-btn").innerHTML = "Save Changes";
            document.querySelector("#edit-user-profile-btn").addEventListener('click', () => {
                newName = document.querySelector('#edited-name').value;
                splitted = newName.split(" ");
                newPostal = document.querySelector("#edited-postal-code").value;
                fetch(`/${username}/profile`, {
                    method: "POST",
                    body: JSON.stringify({
                        firstname: splitted[0],
                        lastname: splitted[1],
                        post: newPostal
                    })
                })
                .then(response => response.json())
                .then(user => {
                    the_profile = document.querySelector("#user-profile-info");
                    the_profile.innerHTML = `<form id="edit-user-profile" style="display: none;">
                    {% csrf_token %}
                    <label for="name" id="login-label">Name:</label><br>
                    <input type="text" id="edited-name" name="name" class="profile-form-text" value='${user.name} ${user.surname}'><br>
                    <label for="postal" id="login-label">Postal Code:</label><br>
                    <input type="text" id="edited-postal-code" class="profile-form-text" value=${user.postal}>
                </form>`;
                    the_profile.innerHTML += `<p id="user-name">Name: ${user.name} ${user.surname}</p><br>`;
                    the_profile.innerHTML += `<p id="postal">Postal Code: ${user.postal}</p><br>`;
                    document.querySelector("#edit-user-profile").style.display = "none";
                    document.querySelector("#edit-prompt").innerHTML = "Please reload the page to make more changes.";
                    document.querySelector("#edit-user-profile-btn").remove()
                    
                })
            })
        })
    })

}

function view_pet_profile(pet) {
    window.scroll(0, 387);
    document.querySelector("#pp-edit").innerHTML = '';
    document.querySelector('#pp-main').innerHTML = "<div id='pp-main-content'></div><br><div id='pp-appts'></div>";
    document.querySelector("#pet-profile-content-container").style.display = 'block';
    document.querySelector("#main-content-container").style.display = 'none';
    fetch(`/${pet}`)
    .then(response => response.json())
    .then(pet_data => {
        const newProfile = document.createElement('div');
        newProfile.setAttribute('id', 'new-pet-profile');
        newProfile.innerHTML = `<img id='pp-img-lg' src='${pet_data.image}'>`
        newProfile.innerHTML += `<h2 id="pp-main-pet">${pet_data.name}'s Pet Profile</h2><button id="pp-main-edit" class="ppm${pet_data.id}">Edit</button>`
        newProfile.innerHTML += `<hr class="hr">`
        newProfile.innerHTML += `<p id="pet-desc">${pet_data.name} is your ${pet_data.age} year-old ${pet_data.breed} ${pet_data.type}.</p>`
        
        newProfile.innerHTML += `<h2 id="pp-main-pet">${pet_data.name}'s Past Visits</h2>`
        newProfile.innerHTML += `<hr class="hr">`
        if (pet_data.appointments == "") {
            newProfile.innerHTML += `<p id="pet-desc">${pet_data.name} has no Vet visits on file.</p>`
        }
        else {
            appointmentCont = document.querySelector("#pp-appts");
            fetch(`/${pet}/appt`)
            .then(response => response.json())
            .then(appts => {
                for (x in appts) {
                    let id = (appts[x].id)
                    let reason = appts[x].reason
                    let accepted = appts[x].accepted
                    let date = appts[x].timestamp
                    slicedate = String(date).slice(0,10);
                    const newAppt = document.createElement('div');
                    newAppt.setAttribute('id', 'pet-appt');
                    newAppt.setAttribute('class', `appt${id}`)
                    newAppt.innerHTML = `<p id='appt-date'>${slicedate}</p>`;
                    newAppt.setAttribute('id', 'appt-container');
                    newAppt.innerHTML += `<h2 id='pp-appt-reason'>${reason}</h2>`;
                    if (accepted == false) {
                        newAppt.innerHTML += `<p id='not-accepted' class='apptcn${id}'>Cancel Appointment</p>`;
                    }
                    appointmentCont.append(newAppt)
                    try {
                        document.querySelector(`.apptcn${id}`).addEventListener('click', () => {
                            cancel_appointment(id)
                            alert(`Appointment Cancelled.`)
                            view_pet_profile(pet)
                        })
                    }
                    catch (TypeError) {
                        ;
                    }
                    
                }
            })
            
        }
        document.querySelector('#pp-main-content').append(newProfile)
        document.querySelector('#pp-main-edit').addEventListener('click', () => {edit_pet_profile(pet_data.id)})
    });
}

function edit_pet_profile(pet_id) {
    window.scroll(0, 387);
    document.querySelector('#pp-main').style.display = 'none';
    document.querySelector('#pp-edit').style.display = 'block';
    fetch(`/${pet_id}/edit`, {
        method:'GET'
    })
    .then(response => response.json())
    .then(pet_data => {
        const csrftoken = getCookie('csrftoken');
        const editF = document.createElement('form');
        editF.setAttribute('method','POST');
        editF.innerHTML = `<input type="hidden" name="csrfmiddlewaretoken" value=${csrftoken}>`;
        editF.innerHTML += `<h2 id='pp-main-pet'>Pet Image URL:</h2>`;
        editF.innerHTML += `<input type='url' id='pp-img-url' class="profile-form-text" value="${pet_data.image}"><br>`;
        editF.innerHTML += `<h2 id='pp-main-pet'>Pet Name:</h2>`;
        editF.innerHTML += `<input type='text' id='pp-name' class="profile-form-text" value="${pet_data.name}"><br>`;
        editF.innerHTML += `<h2 id='pp-main-pet'>Pet Type:</h2>`;
        editF.innerHTML += `<input type='text' id='pp-type' class="profile-form-text" value="${pet_data.type}"><br>`;
        editF.innerHTML += `<h2 id='pp-main-pet'>Pet Breed:</h2>`;
        editF.innerHTML += `<input type='text' id='pp-breed' class="profile-form-text" value="${pet_data.breed}"><br>`;
        editF.innerHTML += `<h2 id='pp-main-pet'>Pet Age:</h2>`;
        editF.innerHTML += `<input type='number' id='pp-age' class="profile-form-text" value="${pet_data.age}"><br>`;
        editF.innerHTML += `<h2 id='pp-main-pet'>Pet Illnesses:</h2>`;
        editF.innerHTML += `<input type='text' id='pp-illness' class="profile-form-text" value="${pet_data.illnesses}"><br>`;
        editF.innerHTML += `<button type='submit' id='form-btn' class='pp-edit-submit-btn'>Save Changes</button>`;
        document.querySelector('#pp-edit').append(editF);
        
        document.querySelector('.pp-edit-submit-btn').addEventListener('click', () => {
            var url = document.querySelector('#pp-img-url').value;
            var name = document.querySelector('#pp-name').value;
            var type = document.querySelector('#pp-type').value;
            var breed = document.querySelector('#pp-breed').value;
            var age = document.querySelector('#pp-age').value;
            var ill = document.querySelector('#pp-illness').value;
            fetch(`/${pet_data.id}/edit`, {
                method: 'POST',
                body: JSON.stringify({
                    url: url,
                    name: name,
                    type: type,
                    breed: breed,
                    age: age,
                    ill: ill
                }),
                headers: {"X-CSRFToken": csrftoken }
            })
            .then(response => response.json())
            .then(pet => {
                view_pet_profile(pet.id);
                
            })


        })
        
    })
}

function create_pet_profile() {
    var petname = document.querySelector("#pet-name").value;
    var type = document.querySelector("#pet-type").value;
    var breed = document.querySelector("#pet-breed").value;
    var age = document.querySelector("#pet-age").value;
    var ill = document.querySelector("#pet-ill").value;
    id = document.querySelector("#userid").innerHTML;
    fetch(`/${id}/create_pet`, {
        method: 'POST',
        body: JSON.stringify({
            user: username,
            name: petname,
            type: type,
            breed: breed,
            age: age,
            illnesses:ill
        })
    })
    .then(response => response.json())
}

function create_appointment(username) {
    pet = 'No Pet';
    urgence = 'None';
    reason = 'None';
    document.querySelectorAll("#appt-pet-image").forEach(pic => {
        
        if (pic.style.border == `4px solid var(--blue)`){
            pet = pic.className;
            pet = pet.slice(-1);
        }
    })
    document.querySelectorAll("#radio").forEach(opt => {
        if (opt.checked) {
            urgence = opt.className;
        }
    })
    reason = document.querySelector("#appt-reason").value;
    if (pet == 'No Pet' || urgence == 'None' || reason == 'None')  {
        alert("You are missing information for your appointment. Please try again. (Error #APT1)")
    }
    else {
        fetch('/makeappt', {
            method: "POST",
            body: JSON.stringify({
                pet: pet,
                urgence: urgence,
                reason:reason
            })
        })
        .then(response => response.json());
        }
}

function cancel_appointment(apptid){
    fetch(`/cancelappt/${apptid}`)
    .then(response => response.json())
}

function load_pets(){
    id = document.querySelector("#userid").innerHTML;
    listed_pets = document.querySelector("#pet-profile-list")
    fetch(`/${id}/load_pets`)
    .then(response => response.json())
    .then(pets => {
        for (pet in pets) {
            let image = pets[pet].image;
            let petid = pets[pet].id;
            const newPetProfile = document.createElement('li');
            newPetProfile.setAttribute("class", "pet-profile-overview");
            newPetProfile.setAttribute("id", `a${pets[pet].id}`);
            newPetProfile.innerHTML = `<a class="pp${pets[pet].id}"><img id='pet-image' src='${image}'></a>`;
            newPetProfile.innerHTML += `<h2 id="pet-profile-name">${pets[pet].name}</h2>`;
            listed_pets.append(newPetProfile);
            document.querySelector(`.pp${petid}`).addEventListener('click', () => {view_pet_profile(petid)})
        }

    })
}

function load_options() {
    id = document.querySelector("#userid").innerHTML;
    the_pets = document.querySelector("#appt-options-list");
    fetch(`/${id}/load_pets`)
    .then(response => response.json())
    .then(pets => {
        for (pet in pets) {
            let image = pets[pet].image;
            let petid = pets[pet].id;
            const petOpt = document.createElement('li');
            petOpt.setAttribute("class", "pet-appt-overview");
            petOpt.setAttribute("id", `a${pets[pet].id}`);
            petOpt.innerHTML = `<a class="appt${pets[pet].id}"><img id='appt-pet-image' class="apptimg${petid}" style="border:4px solid var(--red);"src='${image}'></a><br><h2 id='appt-name'>${pets[pet].name}`;
            the_pets.append(petOpt);
            document.querySelector(`.appt${petid}`).addEventListener('click', () => {
                
                if (document.querySelector(`.apptimg${petid}`).style.border == `4px solid var(--red)`) {
                    document.querySelectorAll('#appt-pet-image').forEach(element => element.style.border = `4px solid var(--red)`);
                    document.querySelector(`.apptimg${petid}`).style.border = `4px solid var(--blue)`
                    
                }
                else {
                    document.querySelector(`.apptimg${petid}`).style.border = `4px solid var(--red)`
                }
            })
        }

    })
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}