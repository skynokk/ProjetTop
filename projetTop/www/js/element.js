const divElement = `
<div class="col-12 col-md-4">
    <div onclick="elementSelect('__link__')">
      <div class="card">
      <div class="card-body">
          <h5 class="card-title">__top__. __title__  <img src="__src__" class="card-img-top" /></h5>
          <p class="card-text">
              __description__
          </p>
      </div>
      </div>
    </div>
</div>
`;

const htmlToElement = (html) => {
    const template = document.createElement("template");
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
};

const fetchApiDone = (json) => {
    const divList = document.getElementById("list");
    json.forEach((element, i) => {
        const newdivElement = divElement
            .replace("__link__", element.name)
            .replace("__src__", element.img)
            .replace("__top__", i + 1)
            .replace("__title__", element.name)
            .replace("__description__", element.description);
        divList.appendChild(htmlToElement(newdivElement));
    });
};

const fetchLocal = (url) => {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(new Response(xhr.response, { status: xhr.status }));
        };
        xhr.onerror = function () {
            reject(new TypeError("Local request failed"));
        };
        xhr.open("GET", url);
        xhr.responseType = "arraybuffer";
        xhr.send(null);
    });
};

const fetchApiElements = () => {
    fetchLocal("api/elements.json").then((response) =>
        response.json().then(fetchApiDone)
    );
};

if ("cordova" in window) {
    document.addEventListener("deviceready", fetchApiElements);
} else {
    document.addEventListener("DOMContentLoaded", fetchApiElements);
}
