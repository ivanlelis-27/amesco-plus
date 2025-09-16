import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { GoogleMapsLoaderService } from '../../services/google-maps-loader.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-map',
    standalone: false,
    template: `<div #mapContainer style="width:100%;height:250px;"></div>`
})
export class MapComponent implements AfterViewInit {
    @Input() lat?: number;
    @Input() lng?: number;
    @Input() address?: string;
    @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

    constructor(private gMapsLoader: GoogleMapsLoaderService) { }

    ngAfterViewInit(): void {
        const apiKey = environment.googleMapsApiKey;

        this.gMapsLoader.load(apiKey).then(() => {
            if (this.lat && this.lng) {
                this.initMap({ lat: this.lat, lng: this.lng });
            } else if (this.address) {
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({ address: this.address }, (results: any, status: any) => {
                    if (status === 'OK' && results[0]) {
                        const location = results[0].geometry.location;
                        this.initMap({ lat: location.lat(), lng: location.lng() });
                    }
                });
            }
        });
    }

    initMap(center: { lat: number, lng: number }) {
        const map = new google.maps.Map(this.mapContainer.nativeElement, {
            center,
            zoom: 16,
            gestureHandling: 'greedy'
        });
        new google.maps.Marker({
            position: center,
            map,
            title: 'Branch Location'
        });
    }
}