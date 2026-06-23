document.addEventListener("DOMContentLoaded", function () {
    const scrollElements = document.querySelectorAll(".scroll-element");

    const elementInView = (el, dividend = 1) => {
        return el.getBoundingClientRect().top <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
    };

    const toggleScrollClass = () => {
        scrollElements.forEach((el) => {
            el.classList.toggle("show", elementInView(el, 1));
        });

        // Tambahan untuk navbar:
        const navbar = document.getElementById("navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };

    // Jalankan saat scroll & saat load awal
    window.addEventListener("scroll", toggleScrollClass);
    toggleScrollClass();

    // Toggle deskripsi gambar (ikon <>)
    window.toggleDeskripsi = function(icon) {
        icon.closest('.foto-card').classList.toggle('show-desc');
    };

    // Jika nanti butuh efek tambahan seperti 'bubble', bisa pakai ini
    window.showBubble = function(element) {
        element.classList.add('show');
    };
});
