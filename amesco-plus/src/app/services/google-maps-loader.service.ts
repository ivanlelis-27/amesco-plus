import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GoogleMapsLoaderService {
    private apiLoaded = false;

    load(apiKey: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.apiLoaded) return resolve();

            // Check if script already exists in DOM
            if (document.getElementById('google-maps-script')) {
                // Wait until window.initMap is called
                const checkInterval = setInterval(() => {
                    if ((window as any).google?.maps) {
                        clearInterval(checkInterval);
                        this.apiLoaded = true;
                        resolve();
                    }
                }, 50);
                return;
            }

            const script = document.createElement('script');
            script.id = 'google-maps-script';
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
            script.async = true;
            script.defer = true;

            (window as any).initMap = () => {
                this.apiLoaded = true;
                resolve();
            };

            script.onerror = (err) => reject(err);
            document.head.appendChild(script);
        });
    }
}
