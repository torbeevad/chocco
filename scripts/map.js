let myMap;
const init = () => {
    myMap = new ymaps.Map("map", {
        center: [59.93, 30.30],
        zoom: 11,
        controls: [],
    });

    let coords = [
        [59.94, 30.38],
        [59.91, 30.50],
        [59.88, 30.31],
        [59.97, 30.31],
    ],
        myCollection = new ymaps.GeoObjectCollection({}, {
            draggable: false,
            iconLayout: 'default#image',
            iconImageHref: './img/map/marker.svg',
            iconImageSize: [46, 57],
            iconImageOffset: [-35, -52]
        });

    for (let i = 0; i < coords.length; i++) {
        myCollection.add(new ymaps.Placemark(coords[i]));
    }

    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');
};

ymaps.ready(init);