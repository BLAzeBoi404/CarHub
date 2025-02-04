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
        images: ["/assets/toyota_camry_2020.png"], // ✅ Путь исправлен
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
        images: ["/assets/car2.png"], // ✅ Путь исправлен
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
      },
    ],
  }),

  actions: {
    fetchListings() {
      this.filteredListings = [...this.listings];
    },
  },
});
