// handle arrow key buttons
function handleArrowKey(e) {
    if (e.keyCode == 37) {
        // left
        moveLeft();
    } else if (e.keyCode == 38) {
        // up
        moveUp();
    } else if (e.keyCode == 39) {
        // right
        moveRight();
    } else if (e.keyCode == 40) {
        // down
        moveDown();
    }
}

 // verify the phone number with rexexp
function verifyPhone() {
    var phone = document.getElementById("phone").value;
    var rex = /^1[3|4|5|7|8][0-9]{9}$/;
    if (!rex.test(phone)) {
        alert("Phone number is not valid");
        return false;
    }
    return true;
}