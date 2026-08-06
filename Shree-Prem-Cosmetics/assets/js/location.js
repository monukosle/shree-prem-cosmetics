const branches = [
    {
        name: "Palasia",
        lat: 22.7256681,
        lng: 75.8941586,
        address: "1B The Mark, Old Palasia, Indore"
    },
    {
        name: "Vijay Nagar",
        lat: 22.7536000,
        lng: 75.9013000,
        address: "PU-4 Vijay Nagar, Indore"
    },
    {
        name: "Annapurna",
        lat: 22.6910000,
        lng: 75.8370000,
        address: "Annapurna Road, Indore"
    },
    {
        name: "Scheme No. 140",
        lat: 22.7034312,
        lng: 75.9160765,
        address: "Scheme No.140, Indore"
    },
    {
        name: "Khatipura",
        lat: 22.7190675,
        lng: 75.8616073,
        address: "17 Behind Maharaja Complex, Khatipura"
    }
];function getDistance(lat1, lon1, lat2, lon2) {

    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;

    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}function findNearestBranch(userLat, userLng) {

    let nearest = null;

    let minDistance = Number.MAX_VALUE;

    branches.forEach(branch => {

        const distance = getDistance(
            userLat,
            userLng,
            branch.lat,
            branch.lng
        );

        if (distance < minDistance) {

            minDistance = distance;

            nearest = branch;

        }

    });

    return {

        branch: nearest,

        distance: minDistance

    };

}function showNearestBranch() {

    if (!navigator.geolocation) {
        return;
    }

    navigator.geolocation.getCurrentPosition(

        function (position) {

            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            const result = findNearestBranch(userLat, userLng);

            const distance =
                result.distance < 1
                    ? Math.round(result.distance * 1000) + " m"
                    : result.distance.toFixed(1) + " km";

            const locationBox = document.getElementById("nearestBranch");

            if (locationBox) {

                locationBox.innerHTML = `
                    <i class="fas fa-location-dot"></i>
                    <strong>${result.branch.name}</strong>
                    <span>${distance}</span>
                `;

            }

        },

        function () {

            const locationBox = document.getElementById("nearestBranch");

            if (locationBox) {

                locationBox.innerHTML = `
                    <i class="fas fa-location-dot"></i>
                    Enable Location
                `;

            }

        }

    );

}

document.addEventListener("DOMContentLoaded", showNearestBranch);