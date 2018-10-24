var battletransformer = (function() {
    var config = {
        "error": {
            "MISSING_APPONENTS": "dont have apponents to fight",
            "FIGHT_TIE": "Fight tie: both Transformers destroyed"
        },
        "getErorrMsg": function (MSG_KEY) {
            return this.error[MSG_KEY];
        }
    }

    var tranformerTeam = {
        autobots: [],
        deceptions: [],
        autobotswiningCount: 0,
        deceptionswiningCount: 0,
        winnersAutobot: "",
        winnersDeception: "",
        loosersAutobot: "",
        loosersDeception: ""
    };

    var sortbyValue = function(sortby, objData) {
        /**
         @param {string, obj:Array} sortBy, arrayObjectData
         @return sortObj:transformer
        */
        var sortObj = objData.sort(function (prev, next) {
            return (parseInt(prev[sortby]) - parseInt(next[sortby]))
        })
        return sortObj
    };

    var filterbygroup = function(filtervalue, objData) {
        /**
         @param {string, Array} filtervalue, objData
         @return objData:transformer
        */
        var filterObj = objData.filter(function (cur) {
            return cur.group == filtervalue;
        })
        return filterObj
    };

    var createTransformer = function(transformrsData) {
        /**
         @param {obj:Array} transformrsData
         @return none
        */
        let transformers = [];
        for (var i = 0; i < transformrsData.length; i++) {
            components = transformrsData[i].split(",")
            var figher = {
                "name": components[0].toString().trim(),
                "group": components[1].toString().trim(),
                "strength": components[2].toString().trim(),
                "intelligence": components[3].toString().trim(),
                "speed": components[4].toString().trim(),
                "endurance": components[5].toString().trim(),
                "rank": parseInt(components[6]),
                "courage": components[7].toString().trim(),
                "firepower": components[8].toString().trim(),
                "skill": parseInt(components[9])
            }
            transformers[i] = figher;
        }
        let sortedObject = sortbyValue("rank", transformers);
        tranformerTeam.autobots = filterbygroup("A", sortedObject);
        tranformerTeam.deceptions = filterbygroup("D", sortedObject);
        apponentFight();
    }


    var battle = function(autobotFigher, deceptionsFighter) {
        /**
         @param {obj} autobotFigher
         @param {obj} deceptionsFighter
         @return obj:winnerTransformer
        */
        var fightInfo = {};

        if ((autobotFigher.name == "OptimusPrime" && deceptionsFighter.name == "Predaking") ||
            (autobotFigher.name == "Predaking" && deceptionsFighter.name == "OptimusPrime")) {
            fightInfo.winner = null;
            fightInfo.looser = null;
        }
        else if (autobotFigher.name == "OptimusPrime" || autobotFigher.name == "Predaking") {
            fightInfo.winner = autobotFigher;
            fightInfo.looser = deceptionsFighter;
            return fightInfo
        }
        else if (deceptionsFighter.name == "OptimusPrime" || deceptionsFighter.name == "Predaking") {
            fightInfo.winner = deceptionsFighter;
            fightInfo.looser = autobotFigher;
            return fightInfo
        }
        else if (autobotFigher.courage - deceptionsFighter.courage >= 4 && autobotFigher.strength - deceptionsFighter.strength >= 3) {
            fightInfo.winner = autobotFigher;
            fightInfo.looser = deceptionsFighter;
            return fightInfo
        } else if (deceptionsFighter.courage - autobotFigher.courage >= 4 && deceptionsFighter.strength - autobotFigher.strength >= 3) {
            fightInfo.winner = deceptionsFighter;
            fightInfo.looser = autobotFigher;
            return fightInfo
        } else if ((autobotFigher.skill - deceptionsFighter.skill) >= 3) {
            (autobotFigher.skill - deceptionsFighter.skill) >= 3 ? fightInfo.autobotFigher = autobotFigher : fightInfo.deceptionsFighter = deceptionsFighter
            return fightInfo
        } else {
            var autobotRating = overalRating(autobotFigher)
            var t2Rating = overalRating(deceptionsFighter)

            if (autobotRating > t2Rating) {
                fightInfo.winner = autobotFigher;
                fightInfo.looser = deceptionsFighter;

            } else if (autobotRating < t2Rating) {
            fightInfo.winner = deceptionsFighter;
            fightInfo.looser = autobotFigher;
            }
        }
        
        fightInfo.looser && fightInfo.looser.group == "A"  ? tranformerTeam.loosersAutobot = fightInfo.looser.name :''
        fightInfo.looser && fightInfo.looser.group == "D"  ? tranformerTeam.loosersDeception += fightInfo.looser.name :''
        return fightInfo;
    }

    var overalRating = function(transformer) {
        /**
         @param {obj} transformer
         @return number:overalRating
        */
        var overalRating = 0
        overalRating = transformer.strength + transformer.intelligence + transformer.speed + transformer.endurance + transformer.firepower
        return overalRating
    }

    var checkApponentsTeam  = function() {
        /**
         @param none
         @return bool
        */
        return tranformerTeam.autobots.length > 0 && tranformerTeam.deceptions.length > 0
    }

    var declareWinnerTeam = function() {
        /**
         @param none
         @return none
        */
        if (tranformerTeam.deceptionswiningCount > tranformerTeam.autobotswiningCount) {
            tranformerTeam.winnerTeam = "Deception";
            tranformerTeam.looserTeam = "Autobot";
        }
        else if (tranformerTeam.deceptionswiningCount < tranformerTeam.autobotswiningCount) {
            tranformerTeam.winnerTeam = "Autobot",
            tranformerTeam.looserTeam = "Deception";
        }
        else if (tranformerTeam.deceptionswiningCount == tranformerTeam.autobotswiningCount) {
            tranformerTeam.winnerTeam = ""
        }
    }

    var apponentFight = function() {
        /**
        @param none
        @return none
        */
        if (checkApponentsTeam()) {
            tranformerTeam.battleCount = (tranformerTeam.autobots.length > tranformerTeam.deceptions.length) ? tranformerTeam.deceptions.length : tranformerTeam.autobots.length

            for (var i = 0; i < tranformerTeam.battleCount; i++) {
                var result = {};
                result = battle(tranformerTeam.autobots[i], tranformerTeam.deceptions[i]);
                if (result.winner && result.winner.group == 'D') {
                    tranformerTeam.deceptionswiningCount += 1;
                    tranformerTeam.winnersDeception += " " + result.winner.name;
                }
                else if (result.winner && result.winner.group == 'A') {
                    tranformerTeam.autobotswiningCount += 1;
                    tranformerTeam.winnersAutobot += " " + result.winner.name;
                }
                else {
                    tranformerTeam.winnerTeam = "";
                }
            }
            declareWinnerTeam()
        }
        else {
            console.log(config.getErorrMsg("MISSING_APPONENTS"));
        }
 
        showResult();
    }

    var getSurvivorsName = function(looser){
        console.log(tranformerTeam.autobots);
        tranformerTeam[looser.toLowerCase()+"s"];
        for (i = tranformerTeam.battleCount-1; i < tranformerTeam[looser.toLowerCase()+"s"].length; i++) {
            console.log(tranformerTeam[looser.toLowerCase()+"s"][i].name)
        }
    }

    var showResult = function() {
        /**
        @param none
        @return none
        */
        if (tranformerTeam.winnerTeam) {
            console.log(tranformerTeam.battleCount + " battle");
            console.log("Winning team (" + tranformerTeam.winnerTeam + "):" + tranformerTeam['winners' + tranformerTeam.winnerTeam]);
            console.log("Survivors from the losing team (" + tranformerTeam.looserTeam + "):" + tranformerTeam.loosersAutobot)
        }
        else {
            console.log(config.getErorrMsg("FIGHT_TIE"));
        }
    }


    var init = function() {
        /**
        initialization
        **/

        createTransformer(this.transformrsData);
    }
    
    return {
        /*transformrsData : ["tranformer1,A,2,6,3,1,4,2,9,7",
            "tranformer2,D,2,6,3,1,4,2,9,7",
            "OptimusPrime,A,2,4,1,1,1,2,9,7",
            "Soundwave,D,2,6,3,2,6,2,9,7",
            "Bluestreak,D,2,6,3,7,8,2,9,7",
            "Hubcap1,A,2,6,3,1,4,9,9,7",
            "hemant,A,2,6,3,1,5,6,9,7",
            "OptimusPrime,A,2,4,1,1,1,2,9,7"],*/


        transformrsData: ["Soundwave, D, 8,9,2,6,7,5,6,10",
                          "Bluestreak, A, 6,6,7,9,5,2,9,7",
                          "OptimusPime, A,4,4,4,4,4,4,4,4"],

        init : init
    }
})();

battletransformer.init();