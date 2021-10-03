
function initMap() {
    const turkey = { name: 'Turkey', lat: 39.1667, lng: 35.6667 };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: turkey
    });

    let locations = [ turkey, ...citiesOfTurkey ];

    for (let i = 0; i < locations.length; i++) {
        const markerSize = 25;
        let markerImage = new google.maps.MarkerImage('img/marker.png',           
            new google.maps.Size(markerSize, markerSize),
            new google.maps.Point(0,0),
            new google.maps.Point(markerSize/2, markerSize/2)
        );
        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
            map: map,
            icon:  markerImage,
            title: locations[i].name
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {

                let imagesModal = new bootstrap.Modal(document.querySelector('.imagesModal'), {  keyboard: true });
                imagesModal.show();

                getPhotos(locations, i);
                
            }
        })(marker, i));
    }
}

function getPhotos(locations, index) {
    document.querySelector('.image-list').innerHTML = '';

    fetch('https://api.unsplash.com/photos/random?count=10&query=' + locations[index].name + '&client_id=JdOdB-eZYiNRw4wbOxOOJzctDhpjIqIAw8aEySvUpBg')
    .then( response => response.json())
    .then(data => {

        document.querySelector('.modal-title').innerHTML = 'Unsplash ' + locations[index].name + ' Photos';

        for (const image of data) {

            let imageDivElement = document.createElement('div');
            imageDivElement.className = 'card-photo';

            let imageElement = document.createElement('img');
            imageElement.className = 'list-image';
            imageElement.setAttribute('alt', image.description || image.alt_description);
            imageElement.setAttribute('title', image.description || image.alt_description);
            imageElement.setAttribute('src', image.urls.thumb);

            let imageLink = document.createElement('a');
            imageLink.href = image.links.html;
            imageLink.setAttribute('target', '_blank')

            imageLink.appendChild(imageElement);
            imageDivElement.appendChild(imageLink);

            document.querySelector('.image-list').appendChild(imageDivElement);

        }

    });
}