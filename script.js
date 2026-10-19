const btn = document.getElementById("btn");
const menu = document.getElementById("menu");

btn.addEventListener("click", () => {

  menu.classList.toggle("hidden");

  if (menu.classList.contains("hidden")) {
    btn.textContent = "☰";
    btn.setAttribute("aria-label", "Open menu");
  } else {
    btn.textContent = "✕";
    btn.setAttribute("aria-label", "Close menu");
  }

});

const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", async function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "") {
      formMessage.textContent = "Please fill in all fields.";
      formMessage.style.color="red";
    return;
  }

  formMessage.textContent = "Sending.....";
  formMessage.style.color = "green";


try{
  const response = await fetch("https://formspree.io/f/xkjoewko",{
    method: "post",
    body: new FormData(form),
    headers: { Accept: "application/json"}
  });

  if(response.ok) {
    formMessage.textContent = "Message sent successfully!";
      formMessage.style.color = "green";
      form.reset();

      setTimeout(function (){
        formMessage.textContent = "";
      }, 3000);
  } else {
      formMessage.textContent = "Something went wrong. Please try again.";
      formMessage.style.color = "red";
    } 
  } catch (error) {
    formMessage.textContent = "Network error. Check your connection.";
    formMessage.style.color = "red";
  }
});