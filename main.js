const { filter } = require("lodash");

// BODYPART_COST: { "move": 50, "work": 100, "attack": 80, "carry": 50, "heal": 250, "ranged_attack": 150, "tough": 10, "claim": 600 }
var PHASE = 0;
var repairTargets;
var repairTargetsRoomTwo;
var fillerTargets;
var fillerTargetsRoomTwo;
var myRoomName = "W17S6";
var myRoomTwoName = "W18S7";
var mySpawnName = "Spawn1";
var myRoomTwoSpawnName = "Spawn2";
var myFriendName = "pallSmenis";
var number = 1;

var numberOfHarvesters;
var numberOfHarvestersRoomTwo;
var numberOfUpgraders;
var numberOfUpgradersRoomTwo;
var numberOfHealers;
var numberOfBuilders;
var numberOfBuildersRoomTwo;
var numberOfRepairers;
var numberOfRepairersRoomTwo;
var numberOfInvaders;
var numberOfTowerFillers;
var numberOfTowerFillersRoomTwo;
var numberOfDefenders;
var numberOfDefendersRoomTwo;
var numberOfScavangers;
var numberOfScavangersRoomTwo;
var numberOfAttackers;
var numberOfAttackersRoomTwo;
var numberOfLinkSenders;
var numberOfLinkReceivers;

var energyContainers;
var energySources;
var constructionSites;

var totaledenergy;
var maxEnergy;

var totaledContainerEnergy;
var maxContainerEnergy;
var containerEnergyBuffer = 10000;

var hostiles;
var hostilesRoomTwo;
var towers;
var towersRoomTwo;

var harvesters = [];
var harvestersRoomTwo = [];
var upgraders = [];
var upgradersRoomTwo = [];
var healers = [];
var builders = [];
var buildersRoomTwo = [];
var repairers = [];
var repairersRoomTwo = [];
var invaders = [];
var towerFillers = [];
var towerFillersRoomTwo = [];
var defenders = [];
var defendersRoomTwo = [];
var scavangers = [];
var scavangersRoomTwo = [];
var attackers = [];
var attackersRoomTwo = [];
var linkReceivers = [];
var linkSenders = [];
var linkSendersRoomTwo = [];
var linkReceiversRoomTwo = [];

var rooomToInvade = Game.flags.Flag1

module.exports.loop = function () {


  constructionSites = Game.spawns.Spawn1.room.find(FIND_CONSTRUCTION_SITES);
  constructionSites2 = Game.rooms["W18S7"].find(FIND_CONSTRUCTION_SITES);
  repairSites = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      return (
        structure.structureType == STRUCTURE_WALL ||
        structure.structureType == STRUCTURE_RAMPART
      );
    },
  });
  energySourcesLength = Game.spawns.Spawn1.room.find(FIND_SOURCES).length;
  energySources = Game.spawns.Spawn1.room.find(FIND_SOURCES);
  var energySourcesRoomTwo = Game.rooms["W18S7"].find(FIND_SOURCES);
  energySources.sort();

  var deadSources = Game.rooms[myRoomName].find(FIND_DROPPED_RESOURCES);
  var deadSourcesRoomTwo = Game.rooms[myRoomTwoName].find(FIND_DROPPED_RESOURCES);
  deadSources.sort();
  console.log("Things to scavenge: " + deadSources.length);
  console.log(deadSources);

  hostiles = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS);
  for (let hostie in hostiles) {
    //filter hostiles by owner
    if (hostiles[hostie].owner.username === myFriendName) {
      hostiles.splice(hostie, 1);
    }
  }
  hostilesRoomTwo = Game.rooms[myRoomTwoName].find(FIND_HOSTILE_CREEPS);
  for (let hostie2 in hostilesRoomTwo) {
    //filter hostiles by owner
    if (hostilesRoomTwo[hostie2].owner.username === myFriendName) {
      hostilesRoomTwo.splice(hostie2, 1);
    }
  }

  towers = Game.rooms[myRoomName].find(FIND_MY_STRUCTURES, {
    filter: { structureType: STRUCTURE_TOWER },
  });
  towersRoomTwo = Game.rooms[myRoomTwoName].find(FIND_MY_STRUCTURES, {
    filter: { structureType: STRUCTURE_TOWER },
  })
  towers.sort();
  towers.reverse();

  var myTowers = Game.rooms[myRoomName].find(FIND_STRUCTURES, {
    filter: (structure) => {
      return structure.structureType == STRUCTURE_TOWER;
    },
  });
  energyContainers = Game.rooms[myRoomName].find(FIND_STRUCTURES, {
    filter: (structure) => {
      return structure.structureType == STRUCTURE_CONTAINER;
    },
  });
  energyContainers.sort();

  var controller = Game.rooms[myRoomName].controller;
  if (controller.level == 1) {
    PHASE = 1;

    numberOfHarvesters = 2;
    numberOfHarvestersRoomTwo = 0;
    numberOfUpgraders = 2;
    numberOfUpgradersRoomTwo = 0;
    numberOfHealers = 0;
    numberOfBuilders = 0;
    numberOfBuildersRoomTwo = 0;
    numberOfRepairers = 0;
    numberOfRepairersRoomTwo = 0;
    numberOfInvaders = 0;
    numberOfTowerFillers = 0;
    numberOfTowerFillersRoomTwo = 0;
    numberOfDefenders = 0;
    numberOfDefendersRoomTwo = 0;
    numberOfScavangers = 0;
    numberOfScavangersRoomTwo = 0;
    numberOfLinkSenders = 0;
    numberOfLinkReceivers = 0;
    numberOfLinkSendersRoomTwo = 0;
    numberOfLinkReceiversRoomTwo = 0;

  } else if (controller.level == 2) {
    PHASE = 2;
    numberOfHarvesters = 4;
    numberOfUpgraders = 4;
    numberOfHealers = 0;
    numberOfBuilders = 3;
    numberOfRepairers = 1;
    numberOfInvaders = 0;
    numberOfTowerFillers = 0;
    numberOfDefenders = 2;
    numberOfScavangers = 1;
    numberOfLinkSenders = 0;
    numberOfLinkReceivers = 0;

    numberOfHarvestersRoomTwo = 0;
    numberOfUpgradersRoomTwo = 0;
    numberOfBuildersRoomTwo = 0;
    numberOfRepairersRoomTwo = 0;
    numberOfTowerFillersRoomTwo = 0;
    numberOfDefendersRoomTwo = 0;
    numberOfScavangersRoomTwo = 0;
    numberOfLinkSendersRoomTwo = 0;
    numberOfLinkReceiversRoomTwo = 0;


  } else if (controller.level == 3) {
    PHASE = 3;
    numberOfHarvesters = 7;
    numberOfUpgraders = 9;
    numberOfHealers = 0;
    numberOfBuilders = 4;
    numberOfRepairers = 1;
    numberOfInvaders = 1;
    numberOfTowerFillers = 1;
    numberOfDefenders = 2;
    numberOfScavangers = 2;
    numberOfAttackers = 1;
    numberOfLinkSenders = 0;
    numberOfLinkReceivers = 0;

    numberOfHarvestersRoomTwo = 2;
    numberOfUpgradersRoomTwo = 4;
    numberOfBuildersRoomTwo = 2;
    numberOfRepairersRoomTwo = 0;
    numberOfTowerFillersRoomTwo = 0;
    numberOfDefendersRoomTwo = 0;
    numberOfScavangersRoomTwo = 0;
    numberOfAttackersRoomTwo = 0;
    numberOfLinkSendersRoomTwo = 0;
    numberOfLinkReceiversRoomTwo = 0;


  } else if (controller.level == 4) {
    PHASE = 4;
    numberOfHarvesters = 5;
    numberOfUpgraders = 5;
    numberOfHealers = 0;
    numberOfBuilders = 2;
    numberOfRepairers = 2;
    numberOfInvaders = 1;
    numberOfTowerFillers = 2;
    numberOfDefenders = 2;
    numberOfScavangers = 0;
    numberOfAttackers = 4;
    numberOfLinkSenders = 0;
    numberOfLinkReceivers = 0;

    numberOfHarvestersRoomTwo = 3;
    numberOfUpgradersRoomTwo = 5;
    numberOfBuildersRoomTwo = 2;
    numberOfRepairersRoomTwo = 1;
    numberOfTowerFillersRoomTwo = 2;
    numberOfDefendersRoomTwo = 2;
    numberOfScavangersRoomTwo = 1;
    numberOfAttackersRoomTwo = 4;
    numberOfLinkSendersRoomTwo = 0;
    numberOfLinkReceiversRoomTwo = 0;


  } else if (controller.level == 5) {
    PHASE = 5;
    numberOfHarvesters = 3;
    numberOfUpgraders = 2;
    numberOfHealers = 0;
    numberOfBuilders = 2;
    numberOfRepairers = 1;
    numberOfInvaders = 1;
    numberOfTowerFillers = 1;
    numberOfDefenders = 1;
    numberOfScavangers = 1;
    numberOfLinkSenders = 3;
    numberOfLinkReceivers = 4;
    numberOfAttackers = 1;

    numberOfHarvestersRoomTwo = 3;
    numberOfUpgradersRoomTwo = 5;
    numberOfBuildersRoomTwo = 2;
    numberOfRepairersRoomTwo = 1;
    numberOfTowerFillersRoomTwo = 2;
    numberOfDefendersRoomTwo = 2;
    numberOfScavangersRoomTwo = 1;
    numberOfAttackersRoomTwo = 1;
    numberOfLinkSendersRoomTwo = 2;
    numberOfLinkReceiversRoomTwo = 2;


  } else if (controller.level == 6) {
    PHASE = 6;
    numberOfHarvesters = 3;
    numberOfUpgraders = 3;
    numberOfHealers = 0;
    numberOfBuilders = 3;
    numberOfRepairers = 2;
    numberOfInvaders = 0;
    numberOfTowerFillers = 2;
    numberOfDefenders = 1;
    numberOfScavangers = 1;
    numberOfLinkSenders = 5;
    numberOfLinkReceivers = 8;
    numberOfAttackers = 1;

    numberOfHarvestersRoomTwo = 3;
    numberOfUpgradersRoomTwo = 3;
    numberOfBuildersRoomTwo = 2;
    numberOfRepairersRoomTwo = 1;
    numberOfTowerFillersRoomTwo = 2;
    numberOfDefendersRoomTwo = 2;
    numberOfScavangersRoomTwo = 4;
    numberOfLinkSendersRoomTwo = 4;
    numberOfLinkReceiversRoomTwo = 4;
    numberOfAttackersRoomTwo = 1;


  } else if (controller.level == 7) {
    PHASE = 7;
    numberOfHarvesters = 7;
    numberOfUpgraders = 9;
    numberOfHealers = 0;
    numberOfBuilders = 3;
    numberOfRepairers = 2;
    numberOfInvaders = 0;
    numberOfTowerFillers = 2;
    numberOfDefenders = 0;
    numberOfScavangers = 0;
    numberOfLinkSenders = 0;
    numberOfLinkReceivers = 0;

    numberOfHarvestersRoomTwo = 0;
    numberOfUpgradersRoomTwo = 0;
    numberOfBuildersRoomTwo = 0;
    numberOfRepairersRoomTwo = 0;
    numberOfTowerFillersRoomTwo = 0;
    numberOfDefendersRoomTwo = 0;
    numberOfScavangersRoomTwo = 0;
    numberOfLinkSendersRoomTwo = 0;
    numberOfLinkReceiversRoomTwo = 0;


  } else if (controller.level == 8) {
    PHASE = 8;
    numberOfHarvesters = 7;
    numberOfUpgraders = 9;
    numberOfHealers = 0;
    numberOfBuilders = 3;
    numberOfRepairers = 2;
    numberOfInvaders = 0;
    numberOfTowerFillers = 2;
    numberOfDefenders = 0;
    numberOfScavangers = 0;
    numberOfLinkSenders = 0;
    numberOfLinkReceivers = 0;

    numberOfHarvestersRoomTwo = 0;
    numberOfUpgradersRoomTwo = 0;
    numberOfBuildersRoomTwo = 0;
    numberOfRepairersRoomTwo = 0;
    numberOfTowerFillersRoomTwo = 0;
    numberOfDefendersRoomTwo = 0;
    numberOfScavangersRoomTwo = 0;
    numberOfLinkSendersRoomTwo = 0;
    numberOfLinkReceiversRoomTwo = 0;


  }
  console.log("phase: " + PHASE + " controller level: " + controller.level);


  harvesters = [];
  harvestersRoomTwo = [];
  upgraders = [];
  upgradersRoomTwo = [];
  builders = [];
  buildersRoomTwo = [];
  repairers = [];
  repairersRoomTwo = [];
  healers = [];

  invaders = [];
  towerFillersRoomTwo = [];
  towerFillers = [];
  defendersRoomTwo = [];
  defenders = [];
  scavangersRoomTwo = [];
  scavangers = [];
  attackersRoomTwo = [];
  attackers = [];
  linkSenders = [];
  linkSendersRoomTwo = [];
  linkReceivers = [];
  linkReceiversRoomTwo = [];


  hurtCreeps = [];

  if (Game.time % 10) {
    const linkFrom = Game.getObjectById("660b0f40955d662f42c25f54");

    const linkTo = Game.getObjectById("660aecada8e937549627008d");

    linkFrom.transferEnergy(linkTo);

    const linkFrom2 = Game.getObjectById("660f352851357a90ab4e9636");

    const linkTo2 = Game.getObjectById("660f67231495414f15818757");

    linkFrom2.transferEnergy(linkTo2);
  }


  // sort current creeps by role and put them into arrays
  for (const i in Game.creeps) {
    repairTargets = Game.rooms[myRoomName].find(FIND_STRUCTURES, {
      filter: (object) => object.hits < object.hitsMax,
    });

    repairTargets.sort((a, b) => a.hits - b.hits);
    repairTargetsRoomTwo = Game.rooms[myRoomTwoName].find(FIND_STRUCTURES, {
      filter: (object) => object.hits < object.hitsMax,
    });

    repairTargets.sort((a, b) => a.hits - b.hits);

    fillerTargets = Game.rooms[myRoomName].find(FIND_STRUCTURES, {
      filter: (object) => object.structureType == STRUCTURE_TOWER,
    });
    fillerTargetsRoomTwo = Game.rooms[myRoomTwoName].find(FIND_STRUCTURES, {
      filter: (object) => object.structureType == STRUCTURE_TOWER,
    });

    if (Game.creeps[i].memory.role == "harvester") {
      harvesters.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "harvester2") {
      harvestersRoomTwo.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "upgrader") {
      upgraders.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "upgrader2") {
      upgradersRoomTwo.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "healer") {
      healers.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "builder") {
      builders.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "builder2") {
      buildersRoomTwo.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "repairer") {
      repairers.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "towerFiller") {
      towerFillers.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "towerFiller2") {
      towerFillersRoomTwo.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "invader") {
      invaders.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "defender") {
      defenders.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "scavanger") {
      scavangers.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "scavanger2") {
      scavangers.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "attacker") {
      attackers.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "attacker2") {
      attackersRoomTwo.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "linkSender") {
      linkSenders.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "linkReceiver") {
      linkReceivers.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "linkSender2") {
      linkSendersRoomTwo.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "linkReceiver2") {
      linkReceiversRoomTwo.push(Game.creeps[i]);
    }
  }
  console.log(
    "Harvesters: " +
    harvesters.length +
    " Upgraders: " +
    upgraders.length +
    " Defenders: " +
    defenders.length +
    " towerFillers: " +
    towerFillers.length +
    " Healers: " +
    healers.length +
    " Builders: " +
    builders.length +
    " Scavangers: " +
    scavangers.length +
    " Repairers: " +
    repairers.length +
    " Invaders: " +
    invaders.length +
    " Attackers: " +
    attackers.length
  );
  console.log(
    "HarvestersRoomTwo: " +
    harvestersRoomTwo.length +
    " UpgradersRoomTwo: " +
    upgradersRoomTwo.length +
    " DefendersRoomTwo: " +
    defendersRoomTwo.length +
    " towerFillersRoomTwo: " +
    towerFillersRoomTwo.length +

    " BuildersRoomTwo: " +
    buildersRoomTwo.length +
    " ScavangersRoomTwo: " +
    scavangersRoomTwo.length +
    " RepairersRoomTwo: " +
    repairersRoomTwo.length +
    " AttackersRoomTwo: " +
    attackersRoomTwo.length

  );

  // if no harvesters in room spawn one
  if (harvesters.length < numberOfHarvesters && PHASE == 0) {
    harvesters.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, MOVE, MOVE],
        "Harvester" + number.toString(),
        { memory: { role: "harvester", isLoaded: false } }
      )
    );
    number++;
  } else if (harvesters.length < numberOfHarvesters && PHASE == 1) {
    harvesters.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, MOVE, MOVE],
        "Harvester" + number.toString(),
        { memory: { role: "harvester", isLoaded: false } }
      )
    );
    number++;
  } else if (harvesters.length < numberOfHarvesters && PHASE == 2) {
    harvesters.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, MOVE, MOVE],
        "Harvester" + number.toString(),
        { memory: { role: "harvester", isLoaded: false } }
      )
    );
    number++;
  } else if (harvesters.length < numberOfHarvesters && PHASE == 3) {
    harvesters.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, WORK, CARRY, MOVE, MOVE, MOVE, MOVE],
        "Harvester" + number.toString(),
        { memory: { role: "harvester", isLoaded: false } }
      )
    );
    number++;
  } else if (harvesters.length < numberOfHarvesters && PHASE == 4) {
    harvesters.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, MOVE],
        "Harvester" + number.toString(),
        { memory: { role: "harvester", isLoaded: false } }
      )
    );
    number++;
  } if (harvesters.length < numberOfHarvesters && PHASE == 5) {
    harvesters.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, MOVE],
        "Harvester" + number.toString(),
        { memory: { role: "harvester", isLoaded: false } }
      )
    );
    number++;
  } else if (harvesters.length < numberOfHarvesters && PHASE == 6) {
    harvesters.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
        "Harvester" + number.toString(),
        { memory: { role: "harvester", isLoaded: false } }
      )
    );
    number++;
  } else if (harvesters.length < numberOfHarvesters && PHASE == 7) {
    harvesters.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        "Harvester" + number.toString(),
        { memory: { role: "harvester", isLoaded: false } }
      )
    );
    number++;
  } else if (harvesters.length < numberOfHarvesters && PHASE == 8) {
    harvesters.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        "Harvester" + number.toString(),
        { memory: { role: "harvester", isLoaded: false } }
      )
    );
    number++;
  } if (harvestersRoomTwo.length < numberOfHarvestersRoomTwo) {
    harvesters.push(
      Game.spawns["Spawn2"].spawnCreep(
        [WORK, CARRY, MOVE],
        "Harvester" + number.toString(),
        { memory: { role: "harvester2", isLoaded: false } }
      )
    );
    number++;
  }

  // if no upgraders in room spawn one
  if (upgradersRoomTwo.length < numberOfUpgradersRoomTwo) {
    upgraders.push(
      Game.spawns["Spawn2"].spawnCreep(
        [WORK, CARRY, MOVE],
        "Upgrader" + number.toString(),
        { memory: { role: "upgrader2", isLoaded: false } }
      )
    );
    number++;
  } else if (upgraders.length < numberOfUpgraders && PHASE == 1) {
    upgraders.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, MOVE, MOVE],
        "Upgrader" + number.toString(),
        { memory: { role: "upgrader", isLoaded: false } }
      )
    );
    number++;
  } else if (upgraders.length < numberOfUpgraders && PHASE == 2) {
    upgraders.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, CARRY, WORK, MOVE, MOVE, MOVE, MOVE],
        "Upgrader" + number.toString(),
        { memory: { role: "upgrader", isLoaded: false } }
      )
    );
    number++;
  } else if (upgraders.length < numberOfUpgraders && PHASE == 3) {
    upgraders.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        "Upgrader" + number.toString(),
        { memory: { role: "upgrader", isLoaded: false } }
      )
    );
    number++;
  } else if (upgraders.length < numberOfUpgraders && PHASE == 4) {
    upgraders.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, MOVE],
        "Upgrader" + number.toString(),
        { memory: { role: "upgrader", isLoaded: false } }
      )
    );
    number++;
  } if (upgraders.length < numberOfUpgraders && PHASE == 5) {
    upgraders.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, MOVE, MOVE],
        "Upgrader" + number.toString(),
        { memory: { role: "upgrader", isLoaded: false } }
      )
    );
    number++;
  } else if (upgraders.length < numberOfUpgraders && PHASE == 6) {
    upgraders.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        "Upgrader" + number.toString(),
        { memory: { role: "upgrader", isLoaded: false } }
      )
    );
    number++;
  } else if (upgraders.length < numberOfUpgraders && PHASE == 7) {
    upgraders.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        "Upgrader" + number.toString(),
        { memory: { role: "upgrader", isLoaded: false } }
      )
    );
    number++;
  } else if (upgraders.length < numberOfUpgraders && PHASE == 8) {
    upgraders.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        "Upgrader" + number.toString(),
        { memory: { role: "upgrader", isLoaded: false } }
      )
    );
    number++;
  }
  if (buildersRoomTwo.length < numberOfBuildersRoomTwo && constructionSites2.length > 0) {
    builders.push(
      Game.spawns["Spawn2"].spawnCreep(
        [WORK, CARRY, MOVE, MOVE],
        "Builder" + number.toString(),
        { memory: { role: "builder2", isLoaded: false } }
      )
    );
    number++;
  }
  //if no builders in room spawn one
  else if (builders.length < numberOfBuilders && constructionSites.length > 0 && PHASE == 1) {
    builders.push(
      Game.spawns[mySpawnName].spawnCreep(
        [WORK, CARRY, MOVE, MOVE],
        "Builder" + number.toString(),
        { memory: { role: "builder", isLoaded: false } }
      )
    );
    number++;
  } else if (builders.length < numberOfBuilders && constructionSites.length > 0 && PHASE == 2) {
    builders.push(
      Game.spawns[mySpawnName].spawnCreep(
        [WORK, CARRY, MOVE, MOVE],
        "Builder" + number.toString(),
        { memory: { role: "builder", isLoaded: false } }
      )
    );
    number++;
  } else if (builders.length < numberOfBuilders && constructionSites.length > 0 && PHASE == 3) {
    builders.push(
      Game.spawns[mySpawnName].spawnCreep(
        [WORK, CARRY, MOVE, MOVE, MOVE, MOVE],
        "Builder" + number.toString(),
        { memory: { role: "builder", isLoaded: false } }
      )
    );
    number++;
  } else if (builders.length < numberOfBuilders && constructionSites.length > 0 && PHASE == 4) {
    builders.push(
      Game.spawns[mySpawnName].spawnCreep(
        [WORK, CARRY, MOVE],
        "Builder" + number.toString(),
        { memory: { role: "builder", isLoaded: false } }
      )
    );
    number++;
  } else if (builders.length < numberOfBuilders && constructionSites.length > 0 && PHASE == 5) {
    builders.push(
      Game.spawns[mySpawnName].spawnCreep(
        [WORK, CARRY, MOVE, MOVE],
        "Builder" + number.toString(),
        { memory: { role: "builder", isLoaded: false } }
      )
    );
    number++;
  } else if (builders.length < numberOfBuilders && constructionSites.length > 0 && PHASE == 6) {
    builders.push(
      Game.spawns[mySpawnName].spawnCreep(
        [WORK, CARRY, CARRY, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
        "Builder" + number.toString(),
        { memory: { role: "builder", isLoaded: false } }
      )
    );
    number++;
  } else if (builders.length < numberOfBuilders && constructionSites.length > 0 && PHASE == 7) {
    builders.push(
      Game.spawns[mySpawnName].spawnCreep(
        [WORK, CARRY, CARRY, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
        "Builder" + number.toString(),
        { memory: { role: "builder", isLoaded: false } }
      )
    );
    number++;
  } else if (builders.length < numberOfBuilders && constructionSites.length > 0 && PHASE == 8) {
    builders.push(
      Game.spawns[mySpawnName].spawnCreep(
        [WORK, CARRY, CARRY, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
        "Builder" + number.toString(),
        { memory: { role: "builder", isLoaded: false } }
      )
    );
    number++;
  }
  //if no repairers in room spawn one
  else if (repairers.length < numberOfRepairers && repairTargets.length > 0) {
    repairers.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
        "Repairer" + number.toString(),
        { memory: { role: "repairer", isLoaded: false } }
      )
    );
    number++;
    //if no towerFillers in room spawn one
  } else if (
    towerFillers.length < numberOfTowerFillers &&
    towers[0].store.getUsedCapacity(RESOURCE_ENERGY) < towers[0].store.getCapacity(RESOURCE_ENERGY)
  ) {
    towerFillers.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
        "TowerFiller" + number.toString(),
        { memory: { role: "towerFiller", isLoaded: false } }
      )
    );
    number++;
  }
  if (
    towerFillersRoomTwo.length < numberOfTowerFillersRoomTwo
  ) {
    towerFillersRoomTwo.push(
      Game.spawns["Spawn2"].spawnCreep(
        [WORK, CARRY, MOVE, MOVE],
        "TowerFiller" + number.toString(),
        { memory: { role: "towerFiller2", isLoaded: false } }
      )
    );
    number++;
  }
  //if no invaders in room spawn one
  else if (invaders.length < numberOfInvaders && Game.gcl == 2) {
    invaders.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, CLAIM, MOVE],
        "Invader" + number.toString(),
        { memory: { role: "invader", isAttacking: false } }
      )
    );
    number++;
  }
  //if no defenders in room spawn one
  else if (defenders.length < numberOfDefenders && hostiles.length > 0) {
    defenders.push(
      Game.spawns["Spawn1"].spawnCreep(
        [MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, TOUGH, TOUGH],
        "Defender" + number.toString(),
        { memory: { role: "defender", isAttacking: false } }
      )
    );
    number++;
    //if no scavangers in room spawn one
  } else if (
    scavangers.length < numberOfScavangers &&
    deadSources.length > 0 &&
    PHASE == 1
  ) {
    scavangers.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, MOVE],
        "Scavanger" + number.toString(),
        { memory: { role: "scavanger", isLoaded: false, maxCapacity: 50 } }
      )
    );
    number++;
  } else if (
    scavangers.length < numberOfScavangers &&
    deadSources.length > 0 &&
    PHASE == 2
  ) {
    scavangers.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        "Scavanger" + number.toString(),
        { memory: { role: "scavanger", isLoaded: false, maxCapacity: 50 } }
      )
    );
    number++;
  } else if (
    scavangers.length < numberOfScavangers &&
    deadSources.length > 0 &&
    PHASE == 3
  ) {
    scavangers.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        "Scavanger" + number.toString(),
        { memory: { role: "scavanger", isLoaded: false, maxCapacity: 50 } }
      )
    );
    number++;
  } else if (
    scavangers.length < numberOfScavangers &&
    deadSources.length > 0 &&
    PHASE == 4
  ) {
    scavangers.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        "Scavanger" + number.toString(),
        { memory: { role: "scavanger", isLoaded: false, maxCapacity: 50 } }
      )
    );
    number++;
  } if (
    scavangers.length < numberOfScavangers &&
    deadSources.length > 0 &&
    PHASE == 5
  ) {
    scavangers.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, MOVE, MOVE],
        "Scavanger" + number.toString(),
        { memory: { role: "scavanger", isLoaded: false, maxCapacity: 50 } }
      )
    );
    number++;
  } if (
    scavangers.length < numberOfScavangers &&
    deadSourcesRoomTwo.length > 0
  ) {
    scavangers.push(
      Game.spawns["Spawn2"].spawnCreep(
        [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        "Scavanger" + number.toString(),
        { memory: { role: "scavanger2", isLoaded: false, maxCapacity: 50 } }
      )
    );
    number++;
  }
  if (attackers.length < numberOfAttackers) {
    attackers.push(
      Game.spawns["Spawn1"].spawnCreep(
        [MOVE, MOVE, MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK],
        "Attacker" + number.toString(),
        { memory: { role: "attacker", isAttacking: false } }
      )
    );
    number++;
  }
  if (attackersRoomTwo.length < numberOfAttackersRoomTwo) {
    attackersRoomTwo.push(
      Game.spawns["Spawn2"].spawnCreep(
        [MOVE, MOVE, MOVE, MOVE, TOUGH, ATTACK],
        "Attacker" + number.toString(),
        { memory: { role: "attacker2", isAttacking: false } }
      )
    );
    number++;
  }
  if (linkSenders.length < numberOfLinkSenders) {
    linkSenders.push(
      Game.spawns["Spawn1"].spawnCreep(
        [MOVE, MOVE, CARRY, WORK],
        "LinkSender" + number.toString(),
        { memory: { role: "linkSender", isLoaded: false } }
      )
    );
    number++;
  }
  if (linkReceivers.length < numberOfLinkReceivers) {
    linkReceivers.push(
      Game.spawns["Spawn1"].spawnCreep(
        [MOVE, MOVE, CARRY, WORK],
        "linkReceiver" + number.toString(),
        { memory: { role: "linkReceiver", isLoaded: false } }
      )
    );
    number++;
  }
  if (linkSendersRoomTwo.length < numberOfLinkSendersRoomTwo) {
    linkSendersRoomTwo.push(
      Game.spawns["Spawn2"].spawnCreep(
        [MOVE, MOVE, CARRY, WORK],
        "LinkSender" + number.toString(),
        { memory: { role: "linkSender2", isLoaded: false } }
      )
    );
    number++;
  }
  if (linkReceiversRoomTwo.length < numberOfLinkReceiversRoomTwo) {
    linkReceiversRoomTwo.push(
      Game.spawns["Spawn2"].spawnCreep(
        [MOVE, MOVE, CARRY, WORK],
        "linkReceiver" + number.toString(),
        { memory: { role: "linkReceiver2", isLoaded: false } }
      )
    );
    number++;
  }
  //clear non-existing creep memory
  for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log("Clearing non-existing creep memory:", name);
    }
  }

  for (var name in Game.rooms) {
    console.log(
      'Room "' + name + '" has ' + Game.rooms[name].energyAvailable + " energy"
    );
  }

  var extensions = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
    filter: { structureType: STRUCTURE_EXTENSION },
  });
  totaledenergy = 0;
  maxEnergy = extensions.length * 50;
  for (var m in extensions) {
    totaledenergy =
      totaledenergy + extensions[m].store.getUsedCapacity(RESOURCE_ENERGY);
  }
  var containers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
    filter: { structureType: STRUCTURE_CONTAINER },
  });
  totaledContainerEnergy = 0;
  maxContainerEnergy = containers.length * 2000;
  for (var l in containers) {
    totaledContainerEnergy =
      totaledContainerEnergy +
      containers[l].store.getUsedCapacity(RESOURCE_ENERGY);
  }
  var storage = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
    filter: { structureType: STRUCTURE_STORAGE },
  });

  //-----------------------------------------------------------------------------------------------------------------------------------------------------

  for (const i in Game.creeps) {
    if (Game.creeps[i].ticksToLive < 200) {
      Game.creeps[i].say("R.I.P.");
    }
    var depositTargets = Game.creeps[i].room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (
          (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_CONTAINER ||
            structure.structureType == STRUCTURE_STORAGE ||
            structure.structureType == STRUCTURE_TOWER) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
      },
    });
    depositTargets.sort();
    depositTargets.reverse();
    var depositTargets2 = Game.rooms[myRoomTwoName].find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (
          (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_CONTAINER ||
            structure.structureType == STRUCTURE_STORAGE ||
            structure.structureType == STRUCTURE_TOWER) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
      },
    })
    repairTargets = Game.creeps[i].room.find(FIND_STRUCTURES, {
      filter: (object) => object.hits < object.hitsMax,
    });

    repairTargets.sort((a, b) => a.hits - b.hits);

    fillerTargets = Game.creeps[i].room.find(FIND_STRUCTURES, {
      filter: (object) => object.structureType == STRUCTURE_TOWER,
    });
    //send memory role: harvester to spawn1 and drop off RESOURCE_ENERGY
    if (Game.creeps[i].memory.role == "harvester") {
      if (
        Game.creeps[i].store.getUsedCapacity() ===
        Game.creeps[i].store.getCapacity()
      ) {
        Game.creeps[i].memory.isLoaded = true;
      } else if (Game.creeps[i].store.getUsedCapacity() === 0) {
        Game.creeps[i].memory.isLoaded = false;
      }
      if (!Game.creeps[i].memory.isLoaded) {
        Game.creeps[i].moveTo(energySources[0], {
          visualizePathStyle: {
            fill: "transparent",
            stroke: "#fff",
            lineStyle: "dashed",
            strokeWidth: 0.15,
            opacity: 0.1,
          },
        });
        Game.creeps[i].harvest(energySources[0]);
      } else if (
        Game.creeps[i].memory.isLoaded == true &&
        Game.spawns["Spawn1"].store.getUsedCapacity(RESOURCE_ENERGY) < 300 &&
        depositTargets.length >= 0
      ) {
        Game.creeps[i].moveTo(Game.spawns["Spawn1"], {
          visualizePathStyle: {
            fill: "transparent",
            stroke: "#fff",
            lineStyle: "dashed",
            strokeWidth: 0.15,
            opacity: 0.1,
          },
        });
        Game.creeps[i].transfer(
          Game.spawns["Spawn1"],
          RESOURCE_ENERGY,
          Game.creeps[i].store.getUsedCapacity()
        );
        Game.creeps[i].transfer(
          Game.spawns["Spawn1"],
          RESOURCE_ENERGY,
          Game.spawns["Spawn1"].store.getFreeCapacity()
        );
      } else if (
        Game.creeps[i].memory.isLoaded === true &&
        Game.spawns["Spawn1"].store.getUsedCapacity(RESOURCE_ENERGY) === 300 &&
        depositTargets.length > 0
      ) {
        console.log("Deposit targets: " + depositTargets);
        if (depositTargets.length > 0) {
          for (b in depositTargets) {
            if (
              Game.creeps[i].transfer(depositTargets[b], RESOURCE_ENERGY) ==
              ERR_NOT_IN_RANGE
            ) {
              Game.creeps[i].moveTo(depositTargets[b], {
                visualizePathStyle: { stroke: "#ffffff" },
              });
            }
          }
        }
      } else if (
        Game.creeps[i].memory.isLoaded == true &&
        Game.spawns["Spawn1"].store.getUsedCapacity(RESOURCE_ENERGY) === 300 &&
        depositTargets.length === 0 &&
        constructionSites.length > 0
      ) {
        //find construction sites

        if (constructionSites.length > 0) {
          if (
            Game.creeps[i].build(
              constructionSites[constructionSites.length - 1]
            ) === ERR_NOT_IN_RANGE
          ) {
            Game.creeps[i].moveTo(
              constructionSites[constructionSites.length - 1],
              {
                visualizePathStyle: {
                  fill: "transparent",
                  stroke: "#fff",
                  lineStyle: "dashed",
                  strokeWidth: 0.15,
                  opacity: 0.1,
                },
              }
            );
          }
        }
      } else if (
        Game.creeps[i].memory.isLoaded == true &&
        Game.spawns["Spawn1"].store.getUsedCapacity(RESOURCE_ENERGY) === 300 &&
        depositTargets.length === 0 &&
        constructionSites.length === 0 &&
        Game.rooms[myRoomName].controller.progress <
        Game.rooms[myRoomName].controller.progressTotal
      ) {
        if (
          Game.creeps[i].upgradeController(
            Game.spawns.Spawn1.room.controller
          ) === ERR_NOT_IN_RANGE
        ) {
          Game.creeps[i].moveTo(Game.spawns.Spawn1.room.controller, {
            visualizePathStyle: {
              fill: "transparent",
              stroke: "#fff",
              lineStyle: "dashed",
              strokeWidth: 0.15,
              opacity: 0.1,
            },
          });
        }
      }
    }
    if (Game.creeps[i].memory.role == "harvester2") {
      if (
        Game.creeps[i].store.getUsedCapacity() ===
        Game.creeps[i].store.getCapacity()
      ) {
        Game.creeps[i].memory.isLoaded = true;
      } else if (Game.creeps[i].store.getUsedCapacity() === 0) {
        Game.creeps[i].memory.isLoaded = false;
      }
      if (!Game.creeps[i].memory.isLoaded) {
        Game.creeps[i].moveTo(energySourcesRoomTwo[0], {
          visualizePathStyle: {
            fill: "transparent",
            stroke: "#fff",
            lineStyle: "dashed",
            strokeWidth: 0.15,
            opacity: 0.1,
          },
        });
        Game.creeps[i].harvest(energySourcesRoomTwo[0]);
      } else if (
        Game.creeps[i].memory.isLoaded == true &&
        Game.spawns["Spawn2"].store.getUsedCapacity(RESOURCE_ENERGY) < 300 &&
        depositTargets.length >= 0
      ) {
        Game.creeps[i].moveTo(Game.spawns["Spawn2"], {
          visualizePathStyle: {
            fill: "transparent",
            stroke: "#fff",
            lineStyle: "dashed",
            strokeWidth: 0.15,
            opacity: 0.1,
          },
        });
        Game.creeps[i].transfer(
          Game.spawns["Spawn2"],
          RESOURCE_ENERGY,
          Game.creeps[i].store.getUsedCapacity()
        );
        Game.creeps[i].transfer(
          Game.spawns["Spawn2"],
          RESOURCE_ENERGY,
          Game.spawns["Spawn2"].store.getFreeCapacity()
        );
      } else if (
        Game.creeps[i].memory.isLoaded === true &&
        Game.spawns["Spawn2"].store.getUsedCapacity(RESOURCE_ENERGY) === 300 &&
        depositTargets2.length > 0
      ) {
        console.log("Deposit targets: " + depositTargets2);
        if (depositTargets2.length > 0) {
          for (y in depositTargets2) {
            if (
              Game.creeps[i].transfer(depositTargets2[y], RESOURCE_ENERGY) ==
              ERR_NOT_IN_RANGE
            ) {
              Game.creeps[i].moveTo(depositTargets2[y], {
                visualizePathStyle: { stroke: "#ffffff" },
              });
            }
          }
        }
      } else if (
        Game.creeps[i].memory.isLoaded == true &&
        Game.spawns["Spawn2"].store.getUsedCapacity(RESOURCE_ENERGY) === 300 &&
        constructionSites2.length > 0
      ) {
        //find construction sites

        if (constructionSites2.length > 0) {
          if (
            Game.creeps[i].build(
              constructionSites2[constructionSites2.length - 1]
            ) === ERR_NOT_IN_RANGE
          ) {
            Game.creeps[i].moveTo(
              constructionSites2[constructionSites2.length - 1],
              {
                visualizePathStyle: {
                  fill: "transparent",
                  stroke: "#fff",
                  lineStyle: "dashed",
                  strokeWidth: 0.15,
                  opacity: 0.1,
                },
              }
            );
          }
        }
      } else if (
        Game.creeps[i].memory.isLoaded == true &&
        Game.spawns["Spawn2"].store.getUsedCapacity(RESOURCE_ENERGY) === 300 &&
        depositTargets.length === 0 &&
        constructionSites2.length === 0 &&
        Game.rooms[myRoomTwoName].controller.progress <
        Game.rooms[myRoomTwoName].controller.progressTotal
      ) {
        if (
          Game.creeps[i].upgradeController(
            Game.spawns.Spawn2.room.controller
          ) === ERR_NOT_IN_RANGE
        ) {
          Game.creeps[i].moveTo(Game.spawns.Spawn2.room.controller, {
            visualizePathStyle: {
              fill: "transparent",
              stroke: "#fff",
              lineStyle: "dashed",
              strokeWidth: 0.15,
              opacity: 0.1,
            },
          });
        }
      }
    }

    if (Game.creeps[i].memory.role == "upgrader") {
      if (
        Game.creeps[i].store.getUsedCapacity() ===
        Game.creeps[i].store.getCapacity()
      ) {
        Game.creeps[i].memory.isLoaded = true;
      } else if (Game.creeps[i].store.getUsedCapacity() === 0) {
        Game.creeps[i].memory.isLoaded = false;
      }
      if (!Game.creeps[i].memory.isLoaded && constructionSites.length > 0) {
        if (Game.creeps[i].harvest(energySources[1]) === ERR_NOT_IN_RANGE) {
          Game.creeps[i].moveTo(energySources[1], {
            visualizePathStyle: {
              fill: "transparent",
              stroke: "#fff",
              lineStyle: "dashed",
              strokeWidth: 0.15,
              opacity: 0.1,
            },
          });
        }
      } else if (
        !Game.creeps[i].memory.isLoaded &&
        constructionSites.length === 0
      ) {
        if (Game.creeps[i].harvest(energySources[1]) === ERR_NOT_IN_RANGE) {
          Game.creeps[i].moveTo(energySources[1], {
            visualizePathStyle: {
              fill: "transparent",
              stroke: "#fff",
              lineStyle: "dashed",
              strokeWidth: 0.15,
              opacity: 0.1,
            },
          });
        }
      } else if (Game.creeps[i].memory.isLoaded == true) {
        if (
          Game.creeps[i].upgradeController(
            Game.spawns.Spawn1.room.controller
          ) === ERR_NOT_IN_RANGE
        ) {
          Game.creeps[i].moveTo(Game.spawns.Spawn1.room.controller, {
            visualizePathStyle: {
              fill: "transparent",
              stroke: "#fff",
              lineStyle: "dashed",
              strokeWidth: 0.15,
              opacity: 0.1,
            },
          });
        }
      }
    }
    if (Game.creeps[i].memory.role == "healer") {
      var hurtCreeps = Game.spawns.Spawn1.room.find(FIND_MY_CREEPS);

      if (hurtCreeps.length > 0) {
        if (Game.creeps[i].heal(hurtCreeps[0]) === ERR_NOT_IN_RANGE) {
          Game.creeps[i].moveTo(hurtCreeps[0], {
            visualizePathStyle: {
              fill: "transparent",
              stroke: "#fff",
              lineStyle: "dashed",
              strokeWidth: 0.15,
              opacity: 0.1,
            },
          });
        }
      }
    }
    if (Game.creeps[i].memory.role == "upgrader2") {
      if (
        Game.creeps[i].store.getUsedCapacity() ===
        Game.creeps[i].store.getCapacity()
      ) {
        Game.creeps[i].memory.isLoaded = true;
      } else if (Game.creeps[i].store.getUsedCapacity() === 0) {
        Game.creeps[i].memory.isLoaded = false;
      }
      if (!Game.creeps[i].memory.isLoaded && constructionSites.length > 0) {
        if (Game.creeps[i].harvest(energySourcesRoomTwo[1]) === ERR_NOT_IN_RANGE) {
          Game.creeps[i].moveTo(energySourcesRoomTwo[1], {
            visualizePathStyle: {
              fill: "transparent",
              stroke: "#fff",
              lineStyle: "dashed",
              strokeWidth: 0.15,
              opacity: 0.1,
            },
          });
        }
      } else if (
        !Game.creeps[i].memory.isLoaded &&
        constructionSites.length === 0
      ) {
        if (Game.creeps[i].harvest(energySourcesRoomTwo[1]) === ERR_NOT_IN_RANGE) {
          Game.creeps[i].moveTo(energySourcesRoomTwo[1], {
            visualizePathStyle: {
              fill: "transparent",
              stroke: "#fff",
              lineStyle: "dashed",
              strokeWidth: 0.15,
              opacity: 0.1,
            },
          });
        }
      } else if (Game.creeps[i].memory.isLoaded == true) {
        if (
          Game.creeps[i].upgradeController(
            Game.rooms["W18S7"].controller
          ) === ERR_NOT_IN_RANGE
        ) {
          Game.creeps[i].moveTo(Game.rooms["W18S7"].controller, {
            visualizePathStyle: {
              fill: "transparent",
              stroke: "#fff",
              lineStyle: "dashed",
              strokeWidth: 0.15,
              opacity: 0.1,
            },
          });
        }
      }
    }
    if (Game.creeps[i].memory.role == "healer") {
      var hurtCreeps = Game.spawns.Spawn1.room.find(FIND_MY_CREEPS);

      if (hurtCreeps.length > 0) {
        if (Game.creeps[i].heal(hurtCreeps[0]) === ERR_NOT_IN_RANGE) {
          Game.creeps[i].moveTo(hurtCreeps[0], {
            visualizePathStyle: {
              fill: "transparent",
              stroke: "#fff",
              lineStyle: "dashed",
              strokeWidth: 0.15,
              opacity: 0.1,
            },
          });
        }
      }
    }
    if (Game.creeps[i].memory.role == "builder") {
      if (
        Game.creeps[i].store.getUsedCapacity() ===
        Game.creeps[i].store.getCapacity()
      ) {
        Game.creeps[i].memory.isLoaded = true;
      } else if (Game.creeps[i].store.getUsedCapacity() === 0) {
        Game.creeps[i].memory.isLoaded = false;
      }
      if (!Game.creeps[i].memory.isLoaded) {
        if (Game.creeps[i].harvest(energySources[0]) === ERR_NOT_IN_RANGE) {
          Game.creeps[i].moveTo(energySources[0], {
            visualizePathStyle: {
              fill: "transparent",
              stroke: "#fff",
              lineStyle: "dashed",
              strokeWidth: 0.15,
              opacity: 0.1,
            },
          });
        }
      } else if (Game.creeps[i].memory.isLoaded == true) {
        //find construction sites

        if (constructionSites.length > 0) {
          if (
            Game.creeps[i].build(
              constructionSites[constructionSites.length - 1]
            ) === ERR_NOT_IN_RANGE
          ) {
            Game.creeps[i].moveTo(
              constructionSites[constructionSites.length - 1],
              {
                visualizePathStyle: {
                  fill: "transparent",
                  stroke: "#fff",
                  lineStyle: "dashed",
                  strokeWidth: 0.15,
                  opacity: 0.1,
                },
              }
            );
          }
        } else {
          Game.creeps[i].moveTo(14, 20, {
            visualizePathStyle: {
              fill: "transparent",
              stroke: "#fff",
              lineStyle: "dashed",
              strokeWidth: 0.15,
              opacity: 0.1,
            },
          });
        }
      }
    } if (Game.creeps[i].memory.role == "builder2") {
      if (
        Game.creeps[i].store.getUsedCapacity() ===
        Game.creeps[i].store.getCapacity()
      ) {
        Game.creeps[i].memory.isLoaded = true;
      } else if (Game.creeps[i].store.getUsedCapacity() === 0) {
        Game.creeps[i].memory.isLoaded = false;
      }
      if (!Game.creeps[i].memory.isLoaded) {
        if (Game.creeps[i].harvest(energySourcesRoomTwo[0]) === ERR_NOT_IN_RANGE) {
          Game.creeps[i].moveTo(energySourcesRoomTwo[0], {
            visualizePathStyle: {
              fill: "transparent",
              stroke: "#fff",
              lineStyle: "dashed",
              strokeWidth: 0.15,
              opacity: 0.1,
            },
          });
        }
      } else if (Game.creeps[i].memory.isLoaded == true) {
        //find construction sites

        if (constructionSites2.length > 0) {
          if (
            Game.creeps[i].build(
              constructionSites2[constructionSites2.length - 1]
            ) === ERR_NOT_IN_RANGE
          ) {
            Game.creeps[i].moveTo(
              constructionSites2[constructionSites2.length - 1],
              {
                visualizePathStyle: {
                  fill: "transparent",
                  stroke: "#fff",
                  lineStyle: "dashed",
                  strokeWidth: 0.15,
                  opacity: 0.1,
                },
              }
            );
          }
        } else {
          Game.creeps[i].moveTo(14, 20, {
            visualizePathStyle: {
              fill: "transparent",
              stroke: "#fff",
              lineStyle: "dashed",
              strokeWidth: 0.15,
              opacity: 0.1,
            },
          });
        }
      }
    }

    else if (
      Game.creeps[i].memory.role == "repairer" &&
      repairTargets.length > 0
    ) {
      if (
        Game.creeps[i].store.getUsedCapacity() ===
        Game.creeps[i].store.getCapacity()
      ) {
        Game.creeps[i].memory.isLoaded = true;
      } else if (Game.creeps[i].store.getUsedCapacity() == 0) {
        Game.creeps[i].memory.isLoaded = false;
      }
      if (!Game.creeps[i].memory.isLoaded) {
        if (Game.creeps[i].harvest(energySources[1]) === ERR_NOT_IN_RANGE) {
          Game.creeps[i].moveTo(energySources[1], {
            visualizePathStyle: {
              fill: "transparent",
              stroke: "#fff",
              lineStyle: "dashed",
              strokeWidth: 0.15,
              opacity: 0.1,
            },
          });
        } else if (
          Game.creeps[i].withdraw(
            storage[0],
            RESOURCE_ENERGY,
            Game.creeps[i].store.getFreeCapacity()
          ) === ERR_NOT_IN_RANGE
        ) {
          Game.creeps[i].moveTo(storage[0], {
            visualizePathStyle: {
              fill: "transparent",
              stroke: "#fff",
              lineStyle: "dashed",
              strokeWidth: 0.15,
              opacity: 0.1,
            },
          });
          console.log("PING");
        }
      } else if (Game.creeps[i].memory.isLoaded == true) {
        //find rapair sites
        if (repairTargets.length > 0) {
          repairTargets.sort(function (a, b) {
            return b.hits - a.hits;
          });
          if (Game.creeps[i].repair(repairTargets[0]) == ERR_NOT_IN_RANGE) {
            Game.creeps[i].moveTo(repairTargets[0], {
              visualizePathStyle: {
                fill: "transparent",
                stroke: "#fff",
                lineStyle: "dashed",
                strokeWidth: 0.15,
                opacity: 0.1,
              },
            });
          }
        }
      }
    }

    // towerFillers fill towers
    else if (Game.creeps[i].memory.role == "towerFiller") {
      if (
        Game.creeps[i].store.getUsedCapacity() ===
        Game.creeps[i].store.getCapacity()
      ) {
        Game.creeps[i].memory.isLoaded = true;
      } else if (Game.creeps[i].store.getUsedCapacity() === 0) {
        Game.creeps[i].memory.isLoaded = false;
      }
      if (!Game.creeps[i].memory.isLoaded) {
        if (Game.creeps[i].harvest(energySources[1]) === ERR_NOT_IN_RANGE) {
          Game.creeps[i].moveTo(energySources[1], {
            visualizePathStyle: {
              fill: "transparent",
              stroke: "#fff",
              lineStyle: "dashed",
              strokeWidth: 0.15,
              opacity: 0.1,
            },
          });
        }

      } else if (Game.creeps[i].memory.isLoaded == true) {
        //find repair sites
        fillerTargets.sort();
        //fillerTargets.reverse();
        for (var k in fillerTargets) {
          if (fillerTargets[k].store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            Game.creeps[i].moveTo(fillerTargets[k]);
            if (
              Game.creeps[i].transfer(
                fillerTargets[k],
                RESOURCE_ENERGY,
                Game.creeps[i].store.getUsedCapacity(RESOURCE_ENERGY)
              ) == ERR_NOT_IN_RANGE
            ) {
              Game.creeps[i].moveTo(fillerTargets[k]);
            }
          }
        }
      }
    } else if (Game.creeps[i].memory.role == "towerFiller2") {
      if (
        Game.creeps[i].store.getUsedCapacity() ===
        Game.creeps[i].store.getCapacity()
      ) {
        Game.creeps[i].memory.isLoaded = true;
      } else if (Game.creeps[i].store.getUsedCapacity() === 0) {
        Game.creeps[i].memory.isLoaded = false;
      }
      if (!Game.creeps[i].memory.isLoaded) {
        if (Game.creeps[i].harvest(energySourcesRoomTwo[1]) === ERR_NOT_IN_RANGE) {
          Game.creeps[i].moveTo(energySourcesRoomTwo[1], {
            visualizePathStyle: {
              fill: "transparent",
              stroke: "#fff",
              lineStyle: "dashed",
              strokeWidth: 0.15,
              opacity: 0.1,
            },
          });
        }

      } else if (Game.creeps[i].memory.isLoaded == true) {
        //find repair sites
        fillerTargetsRoomTwo.sort();
        //fillerTargets.reverse();
        for (var k in fillerTargets) {
          if (fillerTargetsRoomTwo[k].store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            Game.creeps[i].moveTo(fillerTargetsRoomTwo[k]);
            if (
              Game.creeps[i].transfer(
                fillerTargetsRoomTwo[k],
                RESOURCE_ENERGY,
                Game.creeps[i].store.getUsedCapacity(RESOURCE_ENERGY)
              ) == ERR_NOT_IN_RANGE
            ) {
              Game.creeps[i].moveTo(fillerTargetsRoomTwo[k]);
            }
          }
        }
      }
    }
    else if (Game.creeps[i].memory.role == "invader") {
      if (Game.creeps[i].claimController(rooomToInvade.controller) == ERR_NOT_IN_RANGE) {

        Game.creeps[i].moveTo(rooomToInvade.controller, {
          visualizePathStyle: {
            fill: "transparent",
            stroke: "#fff",
            lineStyle: "dashed",
            strokeWidth: 0.15,
            opacity: 0.1,
          },
        });

      } else if (Game.rooms[myRoomName].find(FIND_EXIT)) {
        Game.creeps[i].moveTo(rooomToInvade, {
          visualizePathStyle: {
            fill: "transparent",
            stroke: "#fff",
            lineStyle: "dashed",
            strokeWidth: 0.15,
            opacity: 0.1,
          },
        });

      }
    } else if (
      Game.creeps[i].memory.role == "defender" &&
      hostiles.length > 0
    ) {
      var username1 = hostiles[0].owner.username;
      Game.notify(
        `User ${username1} spotted in room ${myRoomName}` +
        " ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! "
      );
      if (Game.creeps[i].attack(hostiles[0]) == ERR_NOT_IN_RANGE) {
        Game.creeps[i].moveTo(hostiles[0]);
      }
      console.log(
        "ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! "
      );
    } else if (Game.creeps[i].memory.role == "scavanger") {
      if (
        Game.creeps[i].store.getUsedCapacity() ===
        Game.creeps[i].store.getCapacity()
      ) {
        Game.creeps[i].memory.isLoaded = true;
      } else if (Game.creeps[i].store.getUsedCapacity() === 0) {
        Game.creeps[i].memory.isLoaded = false;
      }
      if (Game.creeps[i].memory.isLoaded === false) {
        for (var a in deadSources) {
          if (Game.creeps[i].pickup(deadSources[0]) == ERR_NOT_IN_RANGE) {
            Game.creeps[i].moveTo(deadSources[0], {
              visualizePathStyle: { stroke: "#ffaa00" },
            });
          } else if (
            Game.creeps[i].pickup(
              deadSources[deadSources.length],
              RESOURCE_ENERGY
            ) == ERR_NOT_IN_RANGE
          ) {
            Game.creeps[i].moveTo(deadSources[deadSources.length], {
              visualizePathStyle: { stroke: "#ffaa00" },
            });
          }
        }
      } else if (Game.creeps[i].memory.isLoaded == true &&
        depositTargets.length > 0) {
        console.log("Deposit targets: " + depositTargets);
        depositTargets.reverse();
        if (depositTargets.length > 0) {
          for (b in depositTargets) {
            if (
              Game.creeps[i].transfer(depositTargets[b], RESOURCE_ENERGY) ==
              ERR_NOT_IN_RANGE
            ) {
              Game.creeps[i].moveTo(depositTargets[b], {
                visualizePathStyle: { stroke: "#ffffff" },
              });
            }
          }
        }
      } else if (
        Game.creeps[i].memory.isLoaded == true &&
        Game.spawns["Spawn1"].store.getUsedCapacity(RESOURCE_ENERGY) === 300 &&
        depositTargets.length === 0
      ) {
        if (
          Game.creeps[i].upgradeController(
            Game.spawns.Spawn1.room.controller
          ) == ERR_NOT_IN_RANGE
        ) {
          Game.creeps[i].moveTo(Game.spawns.Spawn1.room.controller, {
            visualizePathStyle: {
              fill: "transparent",
              stroke: "#fff",
              lineStyle: "dashed",
              strokeWidth: 0.15,
              opacity: 0.1,
            },
          });
        }
      }
    } else if (Game.creeps[i].memory.role == "scavanger2") {
      if (
        Game.creeps[i].store.getUsedCapacity() ===
        Game.creeps[i].store.getCapacity()
      ) {
        Game.creeps[i].memory.isLoaded = true;
      } else if (Game.creeps[i].store.getUsedCapacity() === 0) {
        Game.creeps[i].memory.isLoaded = false;
      }
      if (Game.creeps[i].memory.isLoaded === false) {
        for (var z in deadSourcesRoomTwo) {
          if (Game.creeps[i].pickup(deadSourcesRoomTwo[0]) == ERR_NOT_IN_RANGE) {
            Game.creeps[i].moveTo(deadSourcesRoomTwo[0], {
              visualizePathStyle: { stroke: "#ffaa00" },
            });
          } else if (
            Game.creeps[i].pickup(
              deadSourcesRoomTwo[deadSourcesRoomTwo.length],
              RESOURCE_ENERGY
            ) == ERR_NOT_IN_RANGE
          ) {
            Game.creeps[i].moveTo(deadSourcesRoomTwo[deadSourcesRoomTwo.length], {
              visualizePathStyle: { stroke: "#ffaa00" },
            });
          }
        }
      } else if (Game.creeps[i].memory.isLoaded == true &&
        depositTargets.length > 0) {
        console.log("Deposit targets: " + depositTargets);
        depositTargets.reverse();
        if (depositTargets.length > 0) {
          for (b in depositTargets) {
            if (
              Game.creeps[i].transfer(depositTargets[b], RESOURCE_ENERGY) ==
              ERR_NOT_IN_RANGE
            ) {
              Game.creeps[i].moveTo(depositTargets[b], {
                visualizePathStyle: { stroke: "#ffffff" },
              });
            }
          }
        }
      } else if (
        Game.creeps[i].memory.isLoaded == true &&
        Game.spawns["Spawn2"].store.getUsedCapacity(RESOURCE_ENERGY) === 300 &&
        depositTargets.length === 0
      ) {
        if (
          Game.creeps[i].upgradeController(
            Game.spawns.Spawn2.room.controller
          ) == ERR_NOT_IN_RANGE
        ) {
          Game.creeps[i].moveTo(Game.spawns.Spawn2.room.controller, {
            visualizePathStyle: {
              fill: "transparent",
              stroke: "#fff",
              lineStyle: "dashed",
              strokeWidth: 0.15,
              opacity: 0.1,
            },
          });
        }
      }
    }
    if (Game.creeps[i].memory.role === "linkSender") {
      if (
        Game.creeps[i].store.getUsedCapacity() ===
        Game.creeps[i].store.getCapacity()
      ) {
        Game.creeps[i].memory.isLoaded = true;
      } else if (Game.creeps[i].store.getUsedCapacity() === 0) {
        Game.creeps[i].memory.isLoaded = false;
      }
      if (Game.creeps[i].memory.isLoaded === false) {
        if (Game.creeps[i].harvest(energySources[1]) === ERR_NOT_IN_RANGE) {
          Game.creeps[i].moveTo(energySources[1]);
        }
      } if (Game.creeps[i].memory.isLoaded === true) {
        Game.creeps[i].moveTo(Game.getObjectById("660b0f40955d662f42c25f54"));
        Game.creeps[i].transfer(Game.getObjectById("660b0f40955d662f42c25f54"), RESOURCE_ENERGY);

      }
    }

    if (Game.creeps[i].memory.role === "linkReceiver") {
      if (
        Game.creeps[i].store.getUsedCapacity() ===
        Game.creeps[i].store.getCapacity()
      ) {
        Game.creeps[i].memory.isLoaded = true;
      } else if (Game.creeps[i].store.getUsedCapacity() === 0) {
        Game.creeps[i].memory.isLoaded = false;
      }
      if (Game.creeps[i].memory.isLoaded === false) {
        Game.creeps[i].moveTo(Game.getObjectById("660aecada8e937549627008d"));
        if (Game.creeps[i].withdraw(Game.getObjectById("660aecada8e937549627008d"), RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          Game.creeps[i].moveTo(Game.getObjectById("660aecada8e937549627008d"));
        }
      } else if (Game.creeps[i].memory.isLoaded === true) {
        if (
          Game.creeps[i].upgradeController(
            Game.spawns.Spawn1.room.controller
          ) === ERR_NOT_IN_RANGE
        ) {
          Game.creeps[i].moveTo(Game.spawns.Spawn1.room.controller, {
            visualizePathStyle: {
              fill: "transparent",
              stroke: "#fff",
              lineStyle: "dashed",
              strokeWidth: 0.15,
              opacity: 0.1,
            },
          });
        }
      }
    } if (Game.creeps[i].memory.role === "linkSender2") {
      if (
        Game.creeps[i].store.getUsedCapacity() ===
        Game.creeps[i].store.getCapacity()
      ) {
        Game.creeps[i].memory.isLoaded = true;
      } else if (Game.creeps[i].store.getUsedCapacity() === 0) {
        Game.creeps[i].memory.isLoaded = false;
      }
      if (Game.creeps[i].memory.isLoaded === false) {
        if (Game.creeps[i].harvest(energySourcesRoomTwo[1]) === ERR_NOT_IN_RANGE) {
          Game.creeps[i].moveTo(energySourcesRoomTwo[1]);
        }
      } if (Game.creeps[i].memory.isLoaded === true) {
        Game.creeps[i].moveTo(Game.getObjectById("660f352851357a90ab4e9636"));
        Game.creeps[i].transfer(Game.getObjectById("660f352851357a90ab4e9636"), RESOURCE_ENERGY);

      }
    }

    if (Game.creeps[i].memory.role === "linkReceiver2") {
      if (
        Game.creeps[i].store.getUsedCapacity() ===
        Game.creeps[i].store.getCapacity()
      ) {
        Game.creeps[i].memory.isLoaded = true;
      } else if (Game.creeps[i].store.getUsedCapacity() === 0) {
        Game.creeps[i].memory.isLoaded = false;
      }
      if (Game.creeps[i].memory.isLoaded === false) {
        Game.creeps[i].moveTo(Game.getObjectById("660f67231495414f15818757"));
        if (Game.creeps[i].withdraw(Game.getObjectById("660f67231495414f15818757"), RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          Game.creeps[i].moveTo(Game.getObjectById("660f67231495414f15818757"));
        }
      } else if (Game.creeps[i].memory.isLoaded === true) {
        if (
          Game.creeps[i].upgradeController(
            Game.spawns.Spawn2.room.controller
          ) === ERR_NOT_IN_RANGE
        ) {
          Game.creeps[i].moveTo(Game.spawns.Spawn2.room.controller, {
            visualizePathStyle: {
              fill: "transparent",
              stroke: "#fff",
              lineStyle: "dashed",
              strokeWidth: 0.15,
              opacity: 0.1,
            },
          });
        }
      }
    }

    var enemies = Game.creeps[i].room.find(FIND_HOSTILE_CREEPS);

    if (Game.creeps[i].memory.role === "attacker") {
      if (Game.creeps[i].attack(Game.getObjectById("660c906c6a91840012519538")) === ERR_NOT_IN_RANGE) {
        Game.creeps[i].moveTo(Game.getObjectById("660c906c6a91840012519538"), {
          visualizePathStyle: { stroke: "#ff0000" }
        });
      } else {
        if (Game.creeps[i].attack(Game.getObjectById("660c906c6a91840012519538")) === ERR_NOT_IN_RANGE) {
          Game.creeps[i].moveTo(Game.getObjectById("660c906c6a91840012519538"), {
            visualizePathStyle: { stroke: "#ff0000" }
          });
          Game.creeps[i].attack(Game.getObjectById("660c906c6a91840012519538"));
        } else {
          Game.creeps[i].attack(Game.getObjectById("660c906c6a91840012519538"));
        }
      }

    }
    if (Game.creeps[i].memory.role === "attacker2") {
      if (enemies.length === 0) {
        Game.creeps[i].moveTo(Game.flags.AttackFlag, {
          visualizePathStyle: { stroke: "#ff0000" }
        });
      } else {
        if (Game.creeps[i].attack(enemies[0]) === ERR_NOT_IN_RANGE) {
          Game.creeps[i].moveTo(enemies[0], {
            visualizePathStyle: { stroke: "#ff0000" }
          });
          Game.creeps[i].attack(enemies[0]);
        } else {
          Game.creeps[i].attack(enemies[0]);
        }
      }
    }
  }

  /*
        if (repairTargets.length > 0) {
          towers.forEach((tower) => tower.repair(repairTargets[0]));
        }
        */
  if (repairTargetsRoomTwo.length > 0) {
    towersRoomTwo.forEach((tower) => tower.repair(repairTargetsRoomTwo[0]));
  }
  //if there are hostiles - attack them
  if (hostiles.length > 0) {
    var username = hostiles[0].owner.username;
    Game.notify(
      `User ${username} spotted in room ${myRoomName}` +
      " ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! "
    );
    towers.forEach((tower) => tower.attack(hostiles[0]));
    console.log(
      "ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! "
    );
  }
  if (hostilesRoomTwo.length > 0) {
    var username = hostilesRoomTwo[0].owner.username;
    Game.notify(
      `User ${username} spotted in room ${myRoomName}` +
      " ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! "
    );
    towersRoomTwo.forEach((towerR2) => towerR2.attack(hostilesRoomTwo[0]));
    console.log(
      "ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! "
    );
  }

  console.log("fillerTargets: " + fillerTargets.length);
  console.log("deadSources: " + deadSources.length);
  console.log("depositTargets: " + depositTargets.length);
  console.log("Towers: " + myTowers.length);
  console.log("Energy Sources: " + energySources.length);
  console.log("Construction Sites: " + constructionSites.length);
  console.log(
    "EXTENSIONS totaled energy: " + totaledenergy + " maxEnergy: " + maxEnergy
  );
  console.log(
    "CONTAINERS totaled energy: " +
    totaledContainerEnergy +
    " maxEnergy: " +
    maxContainerEnergy
  );
  //console.log(
  //  "STORAGE energy: " +
  //    storage[0].store.getUsedCapacity(RESOURCE_ENERGY) +
  //   " maxEnergy: " +
  //    storage[0].store.getCapacity(RESOURCE_ENERGY)
  //);
  console.log("Hostiles: " + hostiles.length);
  if (hostiles.length > 0) {
    console.log("Hostiles name" + hostiles[0].owner.username);
  }
  console.log("depositTargets: " + depositTargets);
  console.log("-----------------------End Report-----------------------");
}

