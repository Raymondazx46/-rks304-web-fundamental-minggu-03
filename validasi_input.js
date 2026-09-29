// Ambil elemen form dan input
const form = document.getElementById("formRegister");

const fields = {
  username: document.getElementById("username"),
  password: document.getElementById("password"),
  nama: document.getElementById("nama"),
  tanggalLahir: document.getElementById("tanggalLahir"),
  alamat: document.getElementById("alamat"),
  telpon: document.getElementById("telpon"),
};

const errors = {
  username: document.getElementById("errUsername"),
  password: document.getElementById("errPassword"),
  nama: document.getElementById("errNama"),
  tanggalLahir: document.getElementById("errTanggalLahir"),
  alamat: document.getElementById("errAlamat"),
  telpon: document.getElementById("errTelpon"),
};

// Tampilkan / sembunyikan pesan error
function setError(key, message) {
  const input = fields[key];
  const errEl = errors[key];

  if (message) {
    errEl.textContent = message;
    errEl.classList.remove("hidden");
    input.classList.remove("border-gray-300");
    input.classList.add("border-red-500");
  } else {
    errEl.textContent = "";
    errEl.classList.add("hidden");
    input.classList.remove("border-red-500");
    input.classList.add("border-gray-300");
  }
  return !message; // true jika valid
}

// ---------- Fungsi validasi per field ----------

function validateUsername() {
  const v = fields.username.value.trim();
  if (v === "") return setError("username", "Username tidak boleh kosong.");
  if (v.length < 3) return setError("username", "Username minimal 3 karakter.");
  return setError("username", "");
}

function validatePassword() {
  const v = fields.password.value;
  if (v === "") return setError("password", "Password tidak boleh kosong.");
  if (v.length < 8) return setError("password", "Password minimal 8 karakter.");
  return setError("password", "");
}

function validateNama() {
  const v = fields.nama.value.trim();
  if (v === "") return setError("nama", "Nama tidak boleh kosong.");
  return setError("nama", "");
}

function validateTanggalLahir() {
  const v = fields.tanggalLahir.value;
  if (v === "") return setError("tanggalLahir", "Tanggal lahir tidak boleh kosong.");

  // Bandingkan dengan tanggal hari ini (tanpa jam)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const birth = new Date(v + "T00:00:00");

  // Tanggal hari ini harus >= tanggal lahir (tidak boleh future date)
  if (birth > today) {
    return setError("tanggalLahir", "Tanggal lahir tidak boleh melebihi tanggal hari ini.");
  }
  return setError("tanggalLahir", "");
}

function validateAlamat() {
  const v = fields.alamat.value.trim();
  if (v === "") return setError("alamat", "Alamat tidak boleh kosong.");
  return setError("alamat", "");
}

function validateTelpon() {
  const v = fields.telpon.value.trim();
  if (v === "") return setError("telpon", "Nomor telpon tidak boleh kosong.");
  if (!/^\d+$/.test(v)) return setError("telpon", "Nomor telpon hanya boleh berisi angka.");
  if (!v.startsWith("62")) return setError("telpon", "Nomor telpon harus diawali dengan 62.");
  return setError("telpon", "");
}

// ---------- Event handling ----------

// Validasi langsung saat user mengetik / mengubah nilai
fields.username.addEventListener("input", validateUsername);
fields.password.addEventListener("input", validatePassword);
fields.nama.addEventListener("input", validateNama);
fields.tanggalLahir.addEventListener("change", validateTanggalLahir);
fields.alamat.addEventListener("input", validateAlamat);
fields.telpon.addEventListener("input", validateTelpon);

// Validasi juga saat input kehilangan fokus
fields.username.addEventListener("blur", validateUsername);
fields.password.addEventListener("blur", validatePassword);
fields.nama.addEventListener("blur", validateNama);
fields.tanggalLahir.addEventListener("blur", validateTanggalLahir);
fields.alamat.addEventListener("blur", validateAlamat);
fields.telpon.addEventListener("blur", validateTelpon);

// Validasi seluruh form saat submit
form.addEventListener("submit", function (event) {
  const hasil = [
    validateUsername(),
    validatePassword(),
    validateNama(),
    validateTanggalLahir(),
    validateAlamat(),
    validateTelpon(),
  ];

  // Jika ada yang tidak valid, batalkan pengiriman form
  if (hasil.includes(false)) {
    event.preventDefault();
  }
});
