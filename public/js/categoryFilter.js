document.getElementById("categoryFilter").addEventListener("change", function() {
    let selectedCategory = this.value;
    let platformRows = document.getElementsByClassName("platformRow");

    for (let i = 0; i < platformRows.length; i++) {
        let categories = platformRows[i].querySelector(".category").innerHTML;
        if (selectedCategory === "All Categories" || categories.includes(selectedCategory)) {
            platformRows[i].style.display = "table-row";
        } else {
            platformRows[i].style.display = "none";
        }
    }
});