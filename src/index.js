let allRestaurants = [];
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
            .then(data => {
                this.allRestaurants = data;
                console.log("data ", data);
                allRestaurants = data;
            })
            .catch(err => console.log("Error ", err));
    },
    methods: {
        processName(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        },
        mergeCategroy(category) {
            return category.split(' ').join('');
        },
        showCategoryItems(category) {
            const allItems = document.getElementsByClassName('hide_'+ this.mergeCategroy(category));
            console.log('allItems ',allItems.length);
            for(let i = 0; i<allItems.length; i++) {
                allItems[i].style.display = "block";
            }
            document.getElementById('show_' + this.mergeCategroy(category)).style.display = "none";
        }
    }
});
const appInstance = app.mount('#app');
// allRestaurants = appInstance.allRestaurants;
// console.log('allRestaurants ',allRestaurants);
// appInstance.$watch('allRestaurants', function (newValue, oldValue) {
//     const elementId = 'hide_' + appInstance.mergeCategroy(newValue[0].category);
//     console.log(elementId);
//     setTimeout(()=>{
//         console.log(document.getElementById(elementId));
//     },2000);
// });