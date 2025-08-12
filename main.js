let nameInput = document.querySelector(".name");
let phoneInput = document.querySelector(".phone");
let mahsulotInput = document.querySelector(".mahsulot");

let nameError = document.querySelector(".name__bosh");
let phoneError = document.querySelector(".phone__bosh");
let mahsulotError = document.querySelector(".mahsulotni__bosh");

let btn = document.getElementById("button");
let btnjoy = document.querySelector(".button_bosh");

let Token = "8113143297:AAH8JTMC8YW7_fsJLXd7g7pxMjYgwJYLHek";
let chatId = "7324397883";

let onlyLetters = /^[A-Za-z\u0400-\u04FF\s]+$/;
let phoneRegex = /^\+?\d[\d\s]{7,}$/;

btn.addEventListener("click", () => {
  // Avval xatolarni tozalash
  nameError.textContent = "";
  phoneError.textContent = "";
  mahsulotError.textContent = "";
  btnjoy.textContent = "";

  let nameVal = nameInput.value.trim();
  let phoneVal = phoneInput.value.trim();
  let mahsulotVal = mahsulotInput.value.trim();

  let isValid = true;

  if (!nameVal || !onlyLetters.test(nameVal)) {
    nameError.textContent = "❌ Ism faqat harflardan iborat bo‘lishi kerak.";
    isValid = false;
  }

  if (!phoneVal || !phoneRegex.test(phoneVal)) {
    phoneError.textContent = "❌ Telefon raqami noto‘g‘ri formatda.";
    isValid = false;
  }

  if (!mahsulotVal) {
    mahsulotError.textContent = "❌ Mahsulot nomini kiriting.";
    isValid = false;
  }

  if (!isValid) return; // Agar xato bo‘lsa, yubormaydi

  let message = `👨 Ism: ${nameVal}\n☎️ Telefon: ${phoneVal}\n⚙️ Mahsulot: ${mahsulotVal}`;

  fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://api.telegram.org/bot${Token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
        message
      )}`
    )}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data && data.contents) {
        btnjoy.textContent = "✅ Ma'lumot muvaffaqiyatli yuborildi!";
      } else {
        btnjoy.textContent = "❌ Telegramdan rad javobi keldi.";
      }
    })
    .catch((err) => {
      btnjoy.textContent = "❌ Tarmoq xatoligi.";
      console.error(err);
    });
});
