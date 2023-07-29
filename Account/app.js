function selectAvatar(avatarOption) {
    const avatarOptions = document.querySelectorAll('.avatar-option');
    avatarOptions.forEach(option => option.classList.remove('selected'));
    avatarOption.classList.add('selected');

    const selectedAvatar = avatarOption.querySelector('img').src;
    document.getElementById('profilePicture').src = selectedAvatar;
}

//MODAL POP_UP
// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("updateButton");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}
// When the user clicks on <span> (x) or the "Cancel" button, close the modal
function closeModal() {
    modal.style.display = "none";
}
span.onclick = closeModal;

var cancelBtn = document.getElementById("cancelBtn");
cancelBtn.onclick = closeModal;
// Handle form submission
var submitBtn = document.getElementById("submitBtn");
submitBtn.onclick = function () {
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zipCode = document.getElementById("zipCode").value;
    // You can process the data here or send it to a server using AJAX, etc.
    console.log("Address: " + address);
    console.log("City: " + city);
    console.log("State: " + state);
    console.log("Zip Code: " + zipCode);
    // Close the modal after submitting
    closeModal();
}