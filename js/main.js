(function() {
    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storage = firebase.storage();

    // Create a storage reference from our storage service
    var storageRef = storage.ref();

    // Get a reference to the database service
    var database = firebase.database();
    var recentPostsRef = database.ref('images').limitToLast(100);
    recentPostsRef.on('value', function(snapshot) {
      var images = snapshot.val();
      document.getElementById('gallery').innerHTML = "";
      for (var key in images) {
          // skip loop if the property is from prototype
          if (!images.hasOwnProperty(key)) continue;

          var obj = images[key];
          for (var prop in obj) {
              // skip loop if the property is from prototype
              if(!obj.hasOwnProperty(prop)) continue;


              storageRef.child('images/'+obj[prop]+'.gif').getDownloadURL().then(function(url) {
                document.getElementById('gallery').innerHTML +=
                                  '<img class="photo" src="' + url + '"></img>';
              }).catch(function(error) {});
          }
      }
    });
})()