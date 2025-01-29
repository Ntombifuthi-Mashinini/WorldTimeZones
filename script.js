const timeZones = {
    "paris": "Europe/Paris",
    "sydney": "Australia/Sydney",
    "new-york": "America/New_York",
    "south-africa": "Africa/Johannesburg"
};

function updateAllTimes() {
    Object.keys(timeZones).forEach(cityId => {
        const timeZone = timeZones[cityId];
        const now = moment().tz(timeZone);

        const cityElement = document.getElementById(cityId);
        if (cityElement) {
            cityElement.querySelector(".date").textContent = now.format("MMMM Do YYYY");
            cityElement.querySelector(".time").innerHTML = now.format("h:mm:ss") + ` <small>${now.format("A")}</small>`;
        }
    });
}

function handleCitySelection() {
    const selectedCity = document.getElementById("location-select").value;
    document.querySelectorAll(".city").forEach(city => city.classList.add("hidden"));
    const selectedCityElement = document.getElementById(selectedCity);
    if (selectedCityElement) {
        selectedCityElement.classList.remove("hidden");
    }
}

function showUserLocalTime() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(() => {
            const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const now = moment().tz(userTimeZone);
            document.getElementById("user-time").innerHTML = `<strong>Your Local Time:</strong> ${now.format("MMMM Do YYYY, h:mm:ss A")}`;
        });
    }
}

setInterval(updateAllTimes, 1000);
document.getElementById("location-select").addEventListener("change", handleCitySelection);
updateAllTimes();
handleCitySelection();
showUserLocalTime();