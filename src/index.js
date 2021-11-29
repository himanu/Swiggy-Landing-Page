const app = Vue.createApp({
    data() {
        return {
            message: "Hello",
            allRestaurants: [],
            loading: true,
            error: null
        }
    },
    created() {
        fetch("https://mocki.io/v1/3fb1488d-bbdb-4ddd-9a03-a0d2efc98597")
            .then(res => res.json())
            .then(data => this.allRestaurants = data)
            .catch(err => console.log("Error ", err));
    },
    methods: {
        processName(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        }
    }
});
app.mount('#app');