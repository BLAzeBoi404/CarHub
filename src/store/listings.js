import { defineStore } from "pinia";

export const useListingsStore = defineStore("listings", {
  state: () => ({
    listings: [
      {
        id: 1,
        title: "Toyota Camry 2020",
        description: "Відмінний стан, пробіг 50,000 км.",
        price: 450000,
        brand: "Toyota",
        category: "легкові",
        region: "Київ",
        year: 2020,
        mileage: 50000,
        image: "@/assets/toyota_camry_2020.png",
        owner: {
          name: "Іван Іванов",
          email: "owner1@example.com",
          phone: "+380991234567",
          address: "Київ, вул. Хрещатик, 1",
          contactMethod: "email",
        },
        additionalInfo: {
          color: "Чорний",
          engine: "2.5 л",
          fuel: "Бензин",
          transmission: "Автоматична",
          bodyType: "Седан",
          doors: 4,
          seats: 5,
          condition: "Нова",
          warranty: "Так",
        },
        checkInfo: {
          vinVerified: "Перевірено",
          accident: "Не було",
          previousOwners: "1",
          serviceHistory: "Так",
          legalStatus: "Не арештовано",
        },
      },
      {
        id: 2,
        title: "BMW X5 2018",
        description: "Відмінна комплектація, дизель, 3.0.",
        price: 850000,
        brand: "BMW",
        category: "легкові",
        region: "Львів",
        year: 2018,
        mileage: 100000,
        image: "@/assets/car2.png",
        owner: {
          name: "Олександр Петренко",
          email: "owner2@example.com",
          phone: "+380993456789",
          address: "Львів, вул. Івана Франка, 5",
          contactMethod: "phone",
        },
        additionalInfo: {
          color: "Білий",
          engine: "3.0 л",
          fuel: "Дизель",
          transmission: "Автоматична",
          bodyType: "Кросовер",
          doors: 5,
          seats: 5,
          condition: "Відмінний",
          warranty: "Ні",
        },
        checkInfo: {
          vinVerified: "Не перевірено",
          accident: "Був незначний інцидент",
          previousOwners: "2",
          serviceHistory: "Так",
          legalStatus: "Не арештовано",
        },
      },
      // Другие объявления...
    ],
    filteredListings: [],
    favorites: [],
    dailyPostLimit: 10, // Лимит на добавление объявлений в сутки
  }),

  actions: {
    fetchListings() {
      this.filteredListings = [...this.listings];
    },

    addListing(newListing) {
      const user = JSON.parse(localStorage.getItem("user"));
      const lastPostDate = localStorage.getItem("lastPostDate");
      const today = new Date().toDateString(); // Получаем текущую дату

      // Если дата последнего добавления отличается от сегодняшней
      if (lastPostDate !== today) {
        localStorage.setItem("lastPostDate", today); // Обновляем дату последнего добавления
        localStorage.setItem("addedListings", 0); // Сбрасываем счетчик объявлений
      }

      // Получаем текущее количество добавленных объявлений
      const addedListings = Number(localStorage.getItem("addedListings") || 0);

      // Если количество объявлений за день больше лимита
      if (addedListings >= this.dailyPostLimit) {
        alert("Вы не можете добавить больше 10 объявлений в сутки.");
        return;
      }

      // Если лимит не превышен, добавляем объявление
      this.listings.push(newListing);
      localStorage.setItem("addedListings", addedListings + 1); // Увеличиваем счетчик добавленных объявлений

      // Сохраняем объявления в localStorage
      localStorage.setItem("listings", JSON.stringify(this.listings));
    },

    filterListings(filters) {
      this.filteredListings = this.listings.filter((listing) => {
        const matchesCategory = !filters.category || listing.category === filters.category;
        const matchesBrand = !filters.brand || listing.brand === filters.brand;
        const matchesRegion = !filters.region || listing.region === filters.region;
        const matchesYear = !filters.year || listing.year == filters.year;
        const matchesPrice = !filters.price || this.filterByPrice(listing.price, filters.price);
        const matchesSearch = !filters.search || this.filterBySearch(listing, filters.search);

        return matchesCategory && matchesBrand && matchesRegion && matchesYear && matchesPrice && matchesSearch;
      });
    },

    filterByPrice(price, range) {
      const [min, max] = range.split("-").map(Number);
      return (!min || price >= min) && (!max || price <= max);
    },

    filterBySearch(listing, search) {
      const searchLower = search.toLowerCase();
      return listing.title.toLowerCase().includes(searchLower) || listing.description.toLowerCase().includes(searchLower);
    },

    toggleFavorite(id) {
      const index = this.favorites.indexOf(id);
      if (index >= 0) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(id);
      }
    },
  },
});
