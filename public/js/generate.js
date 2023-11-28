const passwordArea=document.getElementById("password");
const btnGenerate=document.getElementById("generateBtn");
const btnCopy=document.getElementById("copyBtn");

function generatePassword() {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()-_+=<>?';
    
    const allChars = lowercaseChars + uppercaseChars + numberChars + specialChars;
    const minLength = 8; // Minimum password length
    const maxLength = 15; // Maximum password length
    const passwordLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }
    return password;
}

document.addEventListener("DOMContentLoaded", () => {
    if (passwordArea.value === "") {
        btnCopy.style.display = "none";
    }
});

btnGenerate.addEventListener("click",()=>{;
    passwordArea.value=generatePassword();
    btnCopy.style.display = "block";
})

btnCopy.addEventListener("click", () => {
    const password = passwordArea.value;
    navigator.clipboard.writeText(password)
        .then(() => {
            passwordArea.select();
        })
        .catch((err) => {
            alert("Copying password failed", err);
        });
})




