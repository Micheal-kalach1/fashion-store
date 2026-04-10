export function redirectByRole(role) {

    if (role === "admin") {
        window.location.href = "/public/pages/admin/dashboard.html";
    }

    else if (role === "vendeur") {
        window.location.href = "/public/pages/vendeur/dashboard.html";
    }

    else if (role === "caissier") {
        window.location.href = "/public/pages/caissier/dashboard.html";
    }

    else {
        window.location.href = "/public/pages/client/catalogue.html";
    }
}