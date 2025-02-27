document.addEventListener("DOMContentLoaded", function () {
    const slotNames = [
        "Mahjong Ways", "Lucky Neko", "Caishen Wins", "Gates of Olympus 1000", "Candy Bonanza", "Captain's Bounty",
        "Dragon Hatch", "Starlight Princess 1000", "Dreams of Macau", "Fortune Rabbit", "Mahjong Ways 2", "Fortune Tiger",
        "Big Bass Bonanza", "Gates of Olympus", "Sweet Bonanza", "Aztec Gems", "Sweet Bonanza Xmas", 
        "Jurassic Kingdom", "Majestic Treasures", "Queen of Bounty", "Spirited Wonders", "Treasures of Aztec",
        "Starlight Princess", "Bonanza Gold", "Wild West Gold", "Joker Jewels", "Pyramid Bonanza",
        "Tuk Tuk Thailand", "Koi Gate", "Koi Koi Treasure", "Arctic Hunt", "Totem Warrior",
        "Ultimate Striker", "Wild Bandito", "Wild Bounty Showdown", "Yakuza Honor", "Zombie Outbreak",
        "Xiang Qi Ways", "Disco 777", "Slotto 4D", "Fortune God’s Pot", "Immortal Love",
        "Great Rhino Megaways", "777 Fire Strike", "Candy Village", "Aztec Gems Deluxe", "5 Lion Megaways",
        "John Hunter", "Christmas Carol Megaways", "The Tweenty House", "Aztec Bonanza", "Fire 88",
        "Zeus Deluxe", "Legend Of Nezha", "Naughty Wukong", "Wild Trucks", "Fa Cai Shen Deluxe",
        "Chicken Drop", "Rise of Samurai Megaways", "The Dog House Megaways", "Fruit Party", "Madame Destiny Megaways",
        "Squid Game 2：Mukunghwa", "Leprechaun’s Fortune", "Pirate Treasure Hunt", "Aztec Gold Temple", "Dragon Chi’s Quest",
        "Buffalo King Megaways", "Gems Bonanza", "Fruit Party 2", "Temujin Treasures", "Lucky Lightning",
        "Pumpkin Patch", "Christmas Gift Rush", "Arctic Wonders", "Treasure Tomb", "Coyote Crash",
        "Rhapsody of Muertos", "Kingyo Riches", "Fish Prawn Crab Bonanza", "Ramakien Blessing", "BlackJack 21",
    ];

    const slots = slotNames.map((name, i) => ({
        id: name,
        name: name,
        rtp: Math.floor(Math.random() * (98 - 80 + 1)) + 80,
        img: `https://www.seokongrush.org/rtp/images/${name}.webp`,
        popular: Math.random() > 0.7 // 30% dari game dianggap populer
    }));

    function getRandomGacorTime() {
        const startHour = Math.floor(Math.random() * 24);
        const endHour = (startHour + 2) % 24;
        return `${startHour.toString().padStart(2, '0')}:00 - ${endHour.toString().padStart(2, '0')}:00`;
    }

    const slotContainer = document.getElementById("slot-container");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const popularGames = slots.filter(slot => slot.popular);
    const popularGamesList = document.querySelector("#popular-games-slider .splide__list");
    popularGames.forEach(game => {
        let slideItem = document.createElement("li");
        slideItem.classList.add("splide__slide");
        slideItem.innerHTML = `<img src="${game.img}" alt="${game.name}">`;
        popularGamesList.appendChild(slideItem);
    });
    new Splide("#popular-games-slider", {
        type: "loop",
        perPage: 4,
        perMove: 1,
        autoplay: true,
        interval: 3000,
        pauseOnHover: true,
        arrows: true,
        pagination: false,
        gap: "2px",
        breakpoints: {
            1024: { perPage: 4, gap: "2px" },
            768: { perPage: 4, gap: "2px" },
            480: { perPage: 4, gap: "2px" },
        }
    }).mount();
    
    function renderSlots(filter = "all") {
        slotContainer.innerHTML = "";

        slots.forEach(slot => {
            if (filter === "winrate" && slot.rtp < 95) return;
            if (filter === "popular" && !slot.popular) return;

            slot.time = getRandomGacorTime();
            let slotCard = document.createElement("div");
            slotCard.classList.add("slot-card");

            let slotContent = `
                <div class="slot-content"><a href="https://slot603gacor.xyz/603">
                    <img src="${slot.img}" alt="${slot.name}" class="slot-image"></a>
                    <div class="slot-info">
                        <h3 class="slot-title">${slot.name}</h3>
                    </div><br>
                    <div class="percent-bar">
                        <div class="percent-fill" id="percent-fill-${slot.id}" style="width: ${slot.rtp}%"></div>
                        <span class="percent-text" id="percent-text-${slot.id}">${slot.rtp}%</span>
                    </div><br>
                    <div id="gacor-time-${slot.id}" class="gacor-box">JAM GACOR<br> <strong>${slot.time}</strong></div>
                </div>
            `;

            slotCard.innerHTML = slotContent;
            slotContainer.appendChild(slotCard);
        });
    }

    function updateRTP() {
        slots.forEach(slot => {
            let newRTP = Math.floor(Math.random() * (98 - 80 + 1)) + 80;
            slot.rtp = newRTP;

            let fillBar = document.getElementById(`percent-fill-${slot.id}`);
            let text = document.getElementById(`percent-text-${slot.id}`);

            if (fillBar && text) {
                fillBar.style.transition = "width 1.5s ease-in-out";
                fillBar.style.width = `${newRTP}%`;
                text.innerText = `${newRTP}%`;
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");
            renderSlots(filter);
        });
    });

    searchButton.addEventListener("click", function () {
        const searchTerm = searchInput.value.toLowerCase();
        const slots = document.querySelectorAll(".slot-card");

        slots.forEach(slot => {
            const slotTitle = slot.querySelector(".slot-title").textContent.toLowerCase();
            if (slotTitle.includes(searchTerm)) {
                slot.style.display = "block";
            } else {
                slot.style.display = "none";
            }
        });
    });

    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            searchButton.click();
        }
    });

    renderSlots();
    setInterval(updateRTP, 10000);
});
