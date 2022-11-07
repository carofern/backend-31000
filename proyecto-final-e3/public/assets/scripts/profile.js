const profileForm = document.querySelector("#profileform");
const avatarDisplay = document.querySelector("#avatarDisplay");

async function getProfile() {
  try {
    const host = window.location.protocol + "//" + window.location.host;
    const destURL = new URL("/api/usuario/profile", host);
    const responseData = await fetch(destURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    if (responseData.status === HTTP_STATUS_OK) {
      return await responseData.json();
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
}

async function loadProfile() {
  const profile = await getProfile();
  if (profile.nombreApellido) {
    profileForm.name.value = profile.nombreApellido;
    profileForm.address.value = profile.direccion;
    profileForm.age.value = profile.edad;
    profileForm.phonenumber.value = profile.telefono;
    profileForm.email.value = profile.email;
    avatarDisplay.src = "/avatars/" + profile.avatar;
  } else {
    loginBtn.href = "/login";
  }
}

loadProfile();
