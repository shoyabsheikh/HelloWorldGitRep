import { LightningElement } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

import leaflet from '@salesforce/resourceUrl/leafletO';

export default class MyMap extends LightningElement {
    // invoke the loaders in connectedCallback() to ensure that
    // the page loads and renders the container before the map is created

    connectedCallback() {
        Promise.all([
            loadStyle(this, leaflet + '/leaflet.css'),
            loadScript(this, leaflet + '/leaflet.js'),
        ]).then(() => {
            // initialize the library using a reference to the container element obtained from the DOM
            const el = this.template.querySelector('div');
            const mymap = L.map(el).setView([51.505, -0.09], 13);

            // Load and display tile layers with your access token
            L.tileLayer(
                'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
                {
                    maxZoom: 18,
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: 'pk.eyJ1Ijoic2hveWFiLXNoZWlraDE3IiwiYSI6ImNreHNyazJpejNnazEycHViMTloNXIzazkifQ.QfZGsNxyEMn3V015968-YA',
                }
            ).addTo(mymap);
        });
    }
}