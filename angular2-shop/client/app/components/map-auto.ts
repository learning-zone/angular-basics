import { Component,Input,Output } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { NgZone} from '@angular/core';
import {UserService} from '../auth/user.service';


declare var google: any;

@Component({
    moduleId: module.id,
    selector: 'map-autocomplete',
    template: require('./map-auto.html'),
    styles: [require('./map-auto.css')],
  })

export class MapAutocomplete{
    public location: any;
    public address: string='';
    @Input() latitude: any = 22.5867;
    @Input() longitude: any= 88.4171 ;

    public autocomplete: any;
    public map: any;
    public marker: any;
    public infowindow; any;
    constructor(public zone: NgZone, public u:UserService) {
        console.log('map component');
  
    }
    
    pickLocation() {
        console.log('setting location');
        this.infowindow.close();
        
        if (window && window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log('new location', position,this.map);
                    if (position.coords) {
                        this.location = position.coords;
                        this.latitude = position.coords.latitude;
                        this.longitude = position.coords.longitude;

                        this.u.latitude = position.coords.latitude;
                        this.u.longitude = position.coords.longitude;

                        this.map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
                        let marker = this.marker;



                        marker.setIcon(/** @type {google.maps.Icon} */({
                           // url: place.icon,
                            size: new google.maps.Size(71, 71),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(17, 34),
                            scaledSize: new google.maps.Size(35, 35)
                        }));
                        marker.setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
                        marker.setVisible(true);


                    }

                }
            )
        } // if

    }

    ngOnInit() {
        
        console.log('init  map component', this.latitude, this.longitude);
        let lat = this.latitude || 22.58;
        let lon = this.longitude|| 88.4171;

        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: lat, lng: lon},
            zoom: 15,
            mapTypeControl:false
        });
        let map = this.map;

        var input = /** @type {!HTMLInputElement} */(
            document.getElementById('pac-input'));

        var pickLocationButton = /** @type {!HTMLInputElement} */(
            document.getElementById('pick-location'));

        //var types = document.getElementById('type-selector');
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(pickLocationButton);

        this.autocomplete = new google.maps.places.Autocomplete(input);
        let autocomplete = this.autocomplete;
        autocomplete.bindTo('bounds', map);

        this.infowindow = new google.maps.InfoWindow();
        let infowindow = this.infowindow;

        this.marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29)
        });

        let marker = this.marker;
        var self = this;

        map.addListener('click', function (e) {
            //placeMarkerAndPanTo(e.latLng, map);
            marker.setPosition(e.latLng);
            console.log(e.latLng);
            self.u.location = e.latLng;
            self.u.latitude = e.latLng.lat();
            self.u.longitude = e.latLng.lng();
            console.log("lat lon", self.u.latitude, self.u.longitude)
            map.panTo(e.latLng);


        });

        autocomplete.addListener('place_changed', function () {
            infowindow.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                //window.alert("Autocomplete's returned place contains no geometry");
                return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                this.location = place.geometry.location;
                 map.setZoom(17);  // Why 17? Because it looks good.
            }
            marker.setIcon(/** @type {google.maps.Icon} */({
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            }));
            marker.setPosition(place.geometry.location);

            self.u.latitude = place.geometry.location.lat();
            self.u.longitude = place.geometry.location.lng();
            
            marker.setVisible(true);

            var address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }
            self.address = address;
            self.u.map_address = address;
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
            infowindow.open(map, marker);
        });
    }
}