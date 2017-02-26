var temp;
var k=ko.observable();
var m=ko.observable();
var st=ko.observableArray();
var loc =ko.observableArray();
var count=0;
var prev;
var info;
var vm=function(){
this.name=ko.observable('nithin'),

this.food=ko.observable(''),
this.place=ko.observable(''),
this.error=ko.observable(''),
//this.bou=k,
this.location=loc,
this.jump=function(){

k(this);
console.log(k().id);
console.log(st()[0].marker);
if(count>0){
  prev.setAnimation(null);
  info.close();
}
//prev.setAnimation(null);
for(var i=0;i<st().length;i++){
  if(k().id==st()[i].id){
    st()[i].marker.setAnimation(google.maps.Animation.BOUNCE);
    prev=st()[i].marker;
    var infowindow = new google.maps.InfoWindow({
                 content:k().name
              });
              infowindow.open(m,st()[i].marker);
              info=infowindow;
  }
}
//console.log(st());
//var myCenter1 = new google.maps.LatLng(k().location.lat,k().location.lng);
 //var x=new google.maps.Marker({position: myCenter1});
//marker1[i].setAnimation(google.maps.Animation.BOUNCE);
//st().setAnimation(google.maps.Animation.BOUNCE);
//console.log(st());
count++;
},

this.search=function(){
  console.log(this.food());
  if((this.food()=='')||( (this.food()=='')&&(this.place()!=''))||( (this.food()!='')&&(this.place()==''))){
    this.error('please enter the both fields');
    console.log('not valid');
  }
  else{
    this.error('');
  }
  $.getJSON('https://api.foursquare.com/v2/venues/explore?&client_id=TYMQXOULIRK3I4V0E5BPIDPWYPCFMNDSXMS0C0AY2P5NJOXN&client_secret=%20R4RUV2LSQVGVBK1SIIUEH2LYQ1FM3QC4QC0NEMVK0B2OCTIA&v=20150102&venuePhotos=1&near='+this.place()+'&query='+this.food(), function(data) {
//console.log(data);
var l=data.response.groups[0].items.length;
//console.log(data.response.groups[0].items[0].venue);
loc.removeAll();
for(var i=0;i<l;i++){
loc.push(data.response.groups[0].items[i].venue);
temp=data.response.groups[0].items[i].venue;
}

var mapCanvas = document.getElementById("map");
var mapOptions = {
  center: new google.maps.LatLng(data.response.groups[0].items[0].venue.location.lat, data.response.groups[0].items[0].venue.location.lng),
  zoom: 10
}
var marker1=[];
 m = new google.maps.Map(mapCanvas, mapOptions);

for(var i=0;i<l;i++){

var myCenter1 = new google.maps.LatLng(data.response.groups[0].items[i].venue.location.lat,data.response.groups[0].items[i].venue.location.lng);

 marker1[i]=new google.maps.Marker({position: myCenter1});
//marker1[i].setAnimation(google.maps.Animation.BOUNCE);
//console.log(data.response.groups[0].items[i].venue);
 marker1[i].setMap(m);

 st.push({marker:marker1[i],id:data.response.groups[0].items[i].venue.id});





}
//console.log(vm1.bou());
});

};

}




var vm1=new vm();

//var foursqureUrl = 'https://api.foursquare.com/v2/venues/explore?' + '&client_id=ZGMJQIUQ0QRSSSESB54PERFFTSK3AEOVNTLMMYQKNBMFMZFW' + '&client_secret= XVH0AKQR5JL4JZG44ANW50MXQLUA0HN4VNY1NTZBJGLYLBUZ'+'&v=20150102&venuePhotos=1' +'as' + 'asa';
//'https://api.foursquare.com/v2/venues/explore?' + '&client_id=TYMQXOULIRK3I4V0E5BPIDPWYPCFMNDSXMS0C0AY2P5NJOXN' + '&client_secret= R4RUV2LSQVGVBK1SIIUEH2LYQ1FM3QC4QC0NEMVK0B2OCTIA' + '&v=20150102&venuePhotos=1' + placeNear + query;


//var self;
function myMap() {
  console.log(loc());
  var mapCanvas = document.getElementById("map");
  var mapOptions = {
    center: new google.maps.LatLng(34.0522, -117.2437  ),
    zoom: 10
  }

  var map = new google.maps.Map(mapCanvas, mapOptions);
  var myCenter1 = new google.maps.LatLng(34.0522,-117.2437 );

   var marker1 = new google.maps.Marker({position: myCenter1});

  marker1.setMap(map);



};







//console.log(vm.place());
//console.log(temp);
ko.applyBindings(vm1);
