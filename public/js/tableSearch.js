// Arama çubuğunu seç
const searchInput = document.getElementById('searchInput');

// Tablodaki tüm satırları seç
const tableRows = document.querySelectorAll('.table tbody tr');

// Arama işlemi için bir fonksiyon oluştur
const searchElements = () => {
    const searchTerm = searchInput.value.toLowerCase(); // Arama metnini küçük harfe dönüştür
    tableRows.forEach(row => {
        const elementName = row.querySelector('.searchItem').textContent.toLowerCase(); // Platform adını al
        if (elementName.includes(searchTerm)) {
            row.style.display = ''; // Eşleşme varsa satırı göster
        } else {
            row.style.display = 'none'; // Eşleşme yoksa satırı gizle
        }
    });
};

// Arama çubuğuna yazı yazıldığında arama işlemini gerçekleştir
searchInput.addEventListener('input', searchElements);