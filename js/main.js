(function() {
    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storage = firebase.storage();

    // Create a storage reference from our storage service
    var storageRef = storage.ref();

    // Get a reference to the database service
    var database = firebase.database();
    var recentPostsRef = database.ref('images');
    recentPostsRef.on('value', function(snapshot) {
      var images = snapshot.val();
      document.getElementById('gallery').innerHTML = "";
      for (var key in images) {

          var imageUrl = images[key].imageUrl;

          document.getElementById('gallery').innerHTML = '<img class="photo" src="' + imageUrl + '"></img>' + document.getElementById('gallery').innerHTML;
      }
    });
})()