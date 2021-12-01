let allRestaurants = [];
const app = Vue.createApp({
    data() {
        return {
            message: "Hello",
            allRestaurants: [],
            swiggyRestaurants: [],
            seeAll: false,
            loading: true,
            error: null,
            imagesUrl: ["https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=500&q=60", "https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=500&q=60", "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=500&q=60", "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=500&q=60", "https://images.unsplash.com/photo-1429554513019-6c61c19ffb7e?auto=format&fit=crop&w=500&q=60", "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=500&q=60", "https://images.unsplash.com/photo-1496412705862-e0088f16f791?auto=format&fit=crop&w=500&q=60", "https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&fit=crop&w=500&q=60", "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=500&q=60", "https://images.unsplash.com/photo-1484980972926-edee96e0960d?auto=format&fit=crop&w=500&q=60", "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?auto=format&fit=crop&w=500&q=60"]
        }
    },
    created() {
        fetch("https://mocki.io/v1/3fb1488d-bbdb-4ddd-9a03-a0d2efc98597")
            .then(res => res.json())
            .then(data => {
                this.allRestaurants = data;
                this.getAllSwiggyRestaurant(data);
            })
            .catch(err => console.log("Error ", err));
    },
    methods: {
        processName(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        },
        mergeCategory(category) {
            return category.split(' ').join('');
        },
        showCategoryItems(category) {
            const allItems = document.getElementsByClassName('hide_'+ this.mergeCategory(category));
            console.log('allItems ',allItems.length);
            for(let i = 0; i<allItems.length; i++) {
                allItems[i].style.display = "block";
            }
            document.getElementById('show_' + this.mergeCategory(category)).style.display = "none";
            document.getElementById('show_' + this.mergeCategory(category)).parentNode.classList.add('hoverEffect');
        },
        getAllSwiggyRestaurant(restaurants) {
            let allSwiggyRestaurant = [];
            restaurants.forEach((restaurantList)=>{
                const temp = restaurantList.restaurantList;
                console.log("restaurant list ", temp);
                temp.forEach((restaurant)=>{
                    if(restaurant.isExlusive) {
                        allSwiggyRestaurant.push(restaurant);
                    }
                })
            })
            this.swiggyRestaurants = allSwiggyRestaurant;
            console.log(allSwiggyRestaurant);
        }
    }
});
const appInstance = app.mount('#app');
const sections = document.getElementsByClassName("brandContainer");
let current = "";
document.addEventListener('scroll',()=>{
    for(let i = 0; i<sections.length; i++) {
        const section = sections[i];
        const top = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if(scrollY >= (top - sectionHeight/3)) {
            current = (section.getAttribute('id'));
        }
    }
    setActiveClass(current);
})

function setActiveClass(current) {
    let a = document.getElementsByClassName('restaurantType');
    if(current === '') {
        console.log('a[0] ',a[0]);
    } else {
        console.log('current ', current, ' a ', a);
        for(let i = 0; i<a.length; i++) {
            a[i].classList.remove("active");
            if(a[i].classList.contains(current)) {
                console.log("Yes");
                a[i].classList.add("active");
            }
        }
    }
}

// allRestaurants = appInstance.allRestaurants;
// console.log('allRestaurants ',allRestaurants);
// appInstance.$watch('allRestaurants', function (newValue, oldValue) {
//     const elementId = 'hide_' + appInstance.mergeCategroy(newValue[0].category);
//     console.log(elementId);
//     setTimeout(()=>{
//         console.log(document.getElementById(elementId));
//     },2000);
// });