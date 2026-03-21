self.addEventListener("install", e=>{
e.waitUntil(
caches.open("smartwise").then(cache=>{
return cache.addAll([
"/",
"/index.html",
"/chat.html",
"/style.css"
])
})
)
})
