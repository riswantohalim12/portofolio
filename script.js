
const menubar = document.querySelector('#menu');
const Navbar = document.querySelector('.navbar');
menubar.onclick=()=>{
    menubar.classList.toggle('bx-x');
    Navbar.classList.toggle('active')
}
const section=document.querySelectorAll('section');
const navlink = document.querySelectorAll('header nav a')
window.onscroll = ()=>{
    section.forEach(sec=>{
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id')
        if(top>offset && top < offset + height){
            sec.classList.add('start-animation');
            navlink.forEach(links=>{
                links.classList.remove('active')
                document.querySelector('header nav a[href*='+id+']').classList.add('active')
              
            })
        }
    })
    var header = document.querySelector('.header');
    header.classList.toggle('sticky',window.scrollY>100)
    menubar.classList.remove('bx-x');
    Navbar.classList.remove('active')
} 



// Ambil elemen input dan tombol search
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const navLinks = document.querySelectorAll('.navbar .nav-item .nav-link');

// Tambahkan event listener untuk tombol Search
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase().trim(); // Ambil teks pencarian
    let found = false;

    // Loop melalui setiap item menu
    navLinks.forEach(link => {
        const text = link.textContent.toLowerCase(); // Ambil teks dari menu

        // Cek apakah teks pencarian cocok dengan menu
        if (text.includes(searchTerm)) {
           
            link.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Scroll ke menu
            found = true;

            // Cek apakah pencarian cocok dengan menu tertentu dan gulir ke bagian tersebut
            const targetId = link.getAttribute('href').substring(1); // Ambil ID dari href
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                // Scroll ke elemen yang sesuai dengan ID
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            link.style.color = ''; // Reset warna jika tidak cocok
        }
    });

    // Jika tidak ada menu yang cocok
    if (!found) {
        alert('Menu not found!');
    }
});





function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
