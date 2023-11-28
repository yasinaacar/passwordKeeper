document.getElementById('filterFavoriteButton').addEventListener('click', function() {
    let platformRows = document.querySelectorAll('.platformRow');

    platformRows.forEach(function(row) {
        let isFavorite = row.querySelector('.fa-heart').classList.contains('isFavorite');
        if (!isFavorite) {
            row.style.display = 'none';
        }
    });
});
