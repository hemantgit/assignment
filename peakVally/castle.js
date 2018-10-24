  var castles = {
    geologyArea: {
      "Peak": "Peak",
      "Valley": "Valley"
    },
    landobj: [],
    searchCastleLocation: function (land, finalObj) {
      var currentobj={};
      for (var i = 0; i < land.length; i++) {
        let isValley = (land[i] < land[i - 1]);
        let isPeak = (land[i] > land[i - 1]);
        if (isValley) {
          currentobj = { "areaIndex": land[i], "area": this.geologyArea.Valley };
          this.landobj.push(currentobj);
        }
        else if (isPeak) {
          currentobj = { "areaIndex": land[i], "area": this.geologyArea.Peak };
          this.landobj.push(currentobj);
        }
        else {
          this.landobj.push({ "areaIndex": land[i], "area": currentobj.area || "" })
        }
      }
      finalObj(this.landobj);
    },
    finalObj: function (landobj) {
      for (var i = 0; i < landobj.length; i++) {
        if (i > 1 && (landobj[i].area == landobj[i - 1].area)) {
          landobj[i - 1].area = "";
        }
      }
      console.log(landobj)
    }
  }

  //let land =[2,6,6,6,3];
  let land = [6,1,4];
  //let land = [2, 2, 2, 2, 4, 4, 5, 5, 3, 3, 3, 2, 1, 4, 8, 9, 9, 3, 3, 3, 2, 2, 2, 2, 1, 1, 3, 4, 5, 6, 7, 7, 8, 8, 9, 9]

  castles.searchCastleLocation(land, castles.finalObj);