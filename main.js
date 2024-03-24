const { filter } = require("lodash");

// BODYPART_COST: { "move": 50, "work": 100, "attack": 80, "carry": 50, "heal": 250, "ranged_attack": 150, "tough": 10, "claim": 600 }
var PHASE = 0;
var repairTargets;
var fillerTargets;
var myRoomName = "W17S6";
var mySpawnName = "Spawn1";
var myFriendName = "pallSmenis";
var number = 1;
var amountToHarvest;
var amountToUpgrade;
var amountToHeal;
var amountToRepair;
var amountToFill;
var amountToBuild;
var amountToScavange;

var numberOfHarvesters;
var numberOfUpgraders;
var numberOfHealers;
var numberOfBuilders;
var numberOfRepairers;
var numberOfInvaders;
var numberOfTowerFillers;
var numberOfDefenders;
var numberOfScavangers;

var energyContainers;
var energySources;
var constructionSites;

var totaledenergy;
var maxEnergy;

var totaledContainerEnergy;
var maxContainerEnergy;
var containerEnergyBuffer = 10000;

var hostiles;
var towers;

var harvesters = [];
var upgraders = [];
var healers = [];
var builders = [];
var repairers = [];
var invaders = [];
var towerFillers = [];
var defenders = [];
var scavangers = [];

module.exports.loop = function () {
  console.log("-----------------------Report-----------------------");
  constructionSitesLength = Game.spawns.Spawn1.room.find(
    FIND_CONSTRUCTION_SITES
  ).length;
  constructionSites = Game.spawns.Spawn1.room.find(FIND_CONSTRUCTION_SITES);
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
  energySources.sort();

  var deadSources = Game.rooms[myRoomName].find(FIND_DROPPED_RESOURCES);
  deadSources.sort();
  console.log("Things to scavenge: " + deadSources.length);
  console.log(deadSources);
  
  hostiles = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS);
  towers = Game.rooms[myRoomName].find(FIND_MY_STRUCTURES, {
    filter: { structureType: STRUCTURE_TOWER },
  });
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
  for (let i in Game.creeps) {
    console.log(
      "name: " +
        Game.creeps[i].name +
        ", ticksToLive: " +
        Game.creeps[i].ticksToLive
    );
  }

  var controller = Game.rooms[myRoomName].controller;
  if (controller.level == 1) {
    PHASE = 1;

    numberOfHarvesters = 2;
    numberOfUpgraders = 2;
    numberOfHealers = 0;
    numberOfBuilders = 0;
    numberOfRepairers = 0;
    numberOfInvaders = 0;
    numberOfTowerFillers = 0;
    numberOfDefenders = 0;
    numberOfScavangers = 0;

    amountToHarvest = 50;
    amountToUpgrade = 50;
    amountToHeal = 50;
    amountToRepair = 50;
    amountToFill = 50;
    amountToBuild = 50;
    amountToScavange = 50;
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

    amountToHarvest = 50;
    amountToUpgrade = 100;
    amountToHeal = 50;
    amountToRepair = 50;
    amountToFill = 50;
    amountToBuild = 50;
    amountToScavange = 50;
  } else if (controller.level == 3) {
    PHASE = 3;
    numberOfHarvesters = 7;
    numberOfUpgraders = 7;
    numberOfHealers = 0;
    numberOfBuilders = 1;
    numberOfRepairers = 1;
    numberOfInvaders = 0;
    numberOfTowerFillers = 2;
    numberOfDefenders = 0;
    numberOfScavangers = 0;
    amountToHarvest = 50;
    amountToUpgrade = 50;
    amountToHeal = 50;
    amountToRepair = 50;
    amountToFill = 50;
    amountToBuild = 50;
    amountToScavange = 50;
  } else if (controller.level == 4) {
    PHASE = 4;
    numberOfHarvesters = 6;
    numberOfUpgraders = 7;
    numberOfHealers = 0;
    numberOfBuilders = 2;
    numberOfRepairers = 2;
    numberOfInvaders = 0;
    numberOfTowerFillers = 2;
    numberOfDefenders = 0;
    numberOfScavangers = 0;
    amountToHarvest = 50;
    amountToUpgrade = 100;
    amountToHeal = 50;
    amountToRepair = 100;
    amountToFill = 100;
    amountToBuild = 100;
    amountToScavange = 100;
  } else if (controller.level == 5) {
    PHASE = 5;
    numberOfHarvesters = 7;
    numberOfUpgraders = 7;
    numberOfHealers = 0;
    numberOfBuilders = 4;
    numberOfRepairers = 2;
    numberOfInvaders = 2;
    numberOfTowerFillers = 2;
    numberOfDefenders = 4;
    numberOfScavangers = 2;
    amountToHarvest = 100;
    amountToUpgrade = 100;
    amountToHeal = 50;
    amountToRepair = 100;
    amountToFill = 100;
    amountToBuild = 50;
    amountToScavange = 50;
  } else if (controller.level == 6) {
    PHASE = 6;
    numberOfHarvesters = 7;
    numberOfUpgraders = 9;
    numberOfHealers = 0;
    numberOfBuilders = 3;
    numberOfRepairers = 2;
    numberOfInvaders = 0;
    numberOfTowerFillers = 2;
    numberOfDefenders = 0;
    numberOfScavangers = 0;
    amountToHarvest = 200;
    amountToUpgrade = 100;
    amountToHeal = 50;
    amountToRepair = 100;
    amountToFill = 100;
    amountToBuild = 100;
    amountToScavange = 100;
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
    amountToHarvest = 200;
    amountToUpgrade = 100;
    amountToHeal = 50;
    amountToRepair = 100;
    amountToFill = 100;
    amountToBuild = 100;
    amountToScavange = 100;
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
    amountToHarvest = 200;
    amountToUpgrade = 100;
    amountToHeal = 50;
    amountToRepair = 100;
    amountToFill = 100;
    amountToBuild = 100;
    amountToScavange = 100;
  }
  console.log("phase: " + PHASE + " controller level: " + controller.level);
  console.log(
    "numberOfHarvesters: " +
      numberOfHarvesters +
      ", numberOfUpgraders: " +
      numberOfUpgraders +
      ", numberOfHealers: " +
      numberOfHealers +
      ", numberOfBuilders: " +
      numberOfBuilders +
      ", numberOfScavangers: " +
      numberOfScavangers +
      ", numberOfRepairers: " +
      numberOfRepairers +
      ", numberOfInvaders: " +
      numberOfInvaders +
      ", numberOfTowerFillers: " +
      numberOfTowerFillers
  );

  harvesters = [];
  upgraders = [];
  builders = [];
  repairers = [];
  healers = [];
  invaders = [];
  towerFillers = [];
  defenders = [];
  scavangers = [];

  hurtCreeps = [];
  // sort current creeps by role and put them into arrays
  for (const i in Game.creeps) {
    repairTargets = Game.creeps[i].room.find(FIND_STRUCTURES, {
      filter: (object) => object.hits < object.hitsMax,
    });

    repairTargets.sort((a, b) => a.hits - b.hits);

    fillerTargets = Game.creeps[i].room.find(FIND_STRUCTURES, {
      filter: (object) => object.structureType == STRUCTURE_TOWER,
    });

    if (Game.creeps[i].memory.role == "harvester") {
      harvesters.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "upgrader") {
      upgraders.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "healer") {
      healers.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "builder") {
      builders.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "repairer") {
      repairers.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "towerFiller") {
      towerFillers.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "invader") {
      invaders.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "defender") {
      defenders.push(Game.creeps[i]);
    } else if (Game.creeps[i].memory.role == "scavanger") {
      scavangers.push(Game.creeps[i]);
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
      invaders.length
  );
  // if no harvesters in room spawn one
  if (harvesters.length < numberOfHarvesters && PHASE == 0) {
    harvesters.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, MOVE],
        "Harvester" + number.toString(),
        { memory: { role: "harvester", isLoaded: false } }
      )
    );
    number++;
  } else if (harvesters.length < numberOfHarvesters && PHASE == 1) {
    harvesters.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, MOVE],
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
        [WORK, CARRY, CARRY, MOVE, MOVE],
        "Harvester" + number.toString(),
        { memory: { role: "harvester", isLoaded: false } }
      )
    );
    number++;
  } else if (harvesters.length < numberOfHarvesters && PHASE == 4) {
    harvesters.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, CARRY, MOVE, MOVE],
        "Harvester" + number.toString(),
        { memory: { role: "harvester", isLoaded: false } }
      )
    );
    number++;
  } else if (harvesters.length < numberOfHarvesters && PHASE == 5) {
    harvesters.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, CARRY, MOVE, MOVE],
        "Harvester" + number.toString(),
        { memory: { role: "harvester", isLoaded: false } }
      )
    );
    number++;
  } else if (harvesters.length < numberOfHarvesters && PHASE == 6) {
    harvesters.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
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
  }

  // if no upgraders in room spawn one
  else if (upgraders.length < numberOfUpgraders && PHASE == 0) {
    upgraders.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, MOVE],
        "Upgrader" + number.toString(),
        { memory: { role: "upgrader", isLoaded: false } }
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
        [WORK, CARRY, CARRY, MOVE, MOVE],
        "Upgrader" + number.toString(),
        { memory: { role: "upgrader", isLoaded: false } }
      )
    );
    number++;
  } else if (upgraders.length < numberOfUpgraders && PHASE == 3) {
    upgraders.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, CARRY, MOVE, MOVE],
        "Upgrader" + number.toString(),
        { memory: { role: "upgrader", isLoaded: false } }
      )
    );
    number++;
  } else if (upgraders.length < numberOfUpgraders && PHASE == 4) {
    upgraders.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, CARRY, MOVE, MOVE],
        "Upgrader" + number.toString(),
        { memory: { role: "upgrader", isLoaded: false } }
      )
    );
    number++;
  } else if (upgraders.length < numberOfUpgraders && PHASE == 5) {
    upgraders.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
        "Upgrader" + number.toString(),
        { memory: { role: "upgrader", isLoaded: false } }
      )
    );
    number++;
  } else if (upgraders.length < numberOfUpgraders && PHASE == 6) {
    upgraders.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
        "Upgrader" + number.toString(),
        { memory: { role: "upgrader", isLoaded: false } }
      )
    );
    number++;
  } else if (upgraders.length < numberOfUpgraders && PHASE == 7) {
    upgraders.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
        "Upgrader" + number.toString(),
        { memory: { role: "upgrader", isLoaded: false } }
      )
    );
    number++;
  } else if (upgraders.length < numberOfUpgraders && PHASE == 8) {
    upgraders.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
        "Upgrader" + number.toString(),
        { memory: { role: "upgrader", isLoaded: false } }
      )
    );
    number++;
  }
  //if no builders in room spawn one
  else if (builders.length < numberOfBuilders && constructionSites.length > 0) {
    builders.push(
      Game.spawns[mySpawnName].spawnCreep(
        [WORK, CARRY, MOVE],
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
        [WORK, CARRY, CARRY, MOVE, MOVE],
        "Repairer" + number.toString(),
        { memory: { role: "repairer", isLoaded: false } }
      )
    );
    number++;
    //if no towerFillers in room spawn one
  } else if (
    towerFillers.length < numberOfTowerFillers &&
    fillerTargets.length > 0
  ) {
    towerFillers.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, CARRY, MOVE, MOVE],
        "TowerFiller" + number.toString(),
        { memory: { role: "towerFiller", isLoaded: false } }
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
  } else if (scavangers.length < numberOfScavangers && deadSources.length > 0) {
    scavangers.push(
      Game.spawns["Spawn1"].spawnCreep(
        [WORK, CARRY, MOVE],
        "Scavanger" + number.toString(),
        { memory: { role: "scavanger", isLoaded: false, maxCapacity: 50 } }
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
  for (const i in Game.creeps) {
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
        Game.creeps[i].store.getUsedCapacity() == Game.creeps[i].store.getFreeCapacity() &&
        !Game.creeps[i].memory.isLoaded
      ) {
        Game.creeps[i].memory.isLoaded = true;
      } else if (
        Game.creeps[i].store.getUsedCapacity() == 0 &&
        Game.creeps[i].memory.isLoaded
      ) {
        Game.creeps[i].memory.isLoaded = false;
      } else if (
        Game.creeps[i].store.getUsedCapacity() < Game.creeps[i].store.getFreeCapacity() &&
        !Game.creeps[i].memory.isLoaded
      ) {
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
        (Game.creeps[i].memory.isLoaded == true &&
        Game.spawns["Spawn1"].store.getUsedCapacity(RESOURCE_ENERGY) < 300  &&
          depositTargets.length > 0)
        
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
      } else if (Game.creeps[i].memory.isLoaded == true &&
        Game.spawns["Spawn1"].store.getUsedCapacity(RESOURCE_ENERGY) === 300 && 
        depositTargets.length > 0) {
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
        depositTargets.length === 0
      ) {
        //find construction sites

        if (constructionSitesLength > 0) {
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
      }
      
      else {
        Game.creeps[i].moveTo(Game.spawns.Spawn1.room.controller, {
          visualizePathStyle: {
            fill: "transparent",
            stroke: "#fff",
            lineStyle: "dashed",
            strokeWidth: 0.15,
            opacity: 0.1,
          },
        });
        Game.creeps[i].upgradeController(Game.spawns.Spawn1.room.controller);
      }
    }

    if (Game.creeps[i].memory.role == "upgrader") {
      if (
        Game.creeps[i].store.getUsedCapacity() == Game.creeps[i].store.getFreeCapacity()&&
        !Game.creeps[i].memory.isLoaded
      ) {
        Game.creeps[i].memory.isLoaded = true;
      } else if (
        Game.creeps[i].store.getUsedCapacity() == 0 &&
        Game.creeps[i].memory.isLoaded
      ) {
        Game.creeps[i].memory.isLoaded = false;
      } else if (
        Game.creeps[i].store.getUsedCapacity() < Game.creeps[i].store.getFreeCapacity() &&
        !Game.creeps[i].memory.isLoaded
      ) {
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
      } else if (
        Game.creeps[i].memory.isLoaded == true
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
        Game.creeps[i].store.getUsedCapacity() == Game.creeps[i].store.getFreeCapacity() &&
        !Game.creeps[i].memory.isLoaded
      ) {
        Game.creeps[i].memory.isLoaded = true;
      } else if (
        Game.creeps[i].store.getUsedCapacity() == 0 &&
        Game.creeps[i].memory.isLoaded
      ) {
        Game.creeps[i].memory.isLoaded = false;
      } else if (
        Game.creeps[i].store.getUsedCapacity() < Game.creeps[i].store.getFreeCapacity() &&
        !Game.creeps[i].memory.isLoaded &&
        totaledContainerEnergy - containerEnergyBuffer < amountToBuild
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
        //find construction sites

        if (constructionSitesLength > 0) {
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
    } else if (
      Game.creeps[i].memory.role == "repairer" &&
      repairTargets.length > 0
    ) {
      if (
        Game.creeps[i].store.getUsedCapacity() == Game.creeps[i].store.getFreeCapacity() &&
        !Game.creeps[i].memory.isLoaded
      ) {
        Game.creeps[i].memory.isLoaded = true;
      } else if (
        Game.creeps[i].store.getUsedCapacity() == 0 &&
        Game.creeps[i].memory.isLoaded
      ) {
        Game.creeps[i].memory.isLoaded = false;
      }
      if (
        Game.creeps[i].store.getUsedCapacity() < Game.creeps[i].store.getFreeCapacity() &&
        !Game.creeps[i].memory.isLoaded
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
        } else if (
          Game.creeps[i].withdraw(
            storage[0],
            RESOURCE_ENERGY,
            amountToRepair
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
        Game.creeps[i].store.getUsedCapacity() == Game.creeps[i].store.getFreeCapacity() &&
        !Game.creeps[i].memory.isLoaded
      ) {
        Game.creeps[i].memory.isLoaded = true;
      } else if (
        Game.creeps[i].store.getUsedCapacity() == 0 &&
        Game.creeps[i].memory.isLoaded
      ) {
        Game.creeps[i].memory.isLoaded = false;
      } else if (
        Game.creeps[i].store.getUsedCapacity() < Game.creeps[i].store.getFreeCapacity() &&
        !Game.creeps[i].memory.isLoaded
      ) {
        if (
          Game.creeps[i].withdraw(
            depositTargets[2],
            RESOURCE_ENERGY,
            Game.creeps[i].store.getFreeCapacity(RESOURCE_ENERGY)
          ) === ERR_NOT_IN_RANGE
        ) {
          Game.creeps[i].moveTo(depositTargets[2], {
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
    } else if (Game.creeps[i].memory.role == "invader") {
      if (Game.rooms[myRoomName].find(FIND_EXIT_LEFT)) {
        Game.creeps[i].moveTo(0, 8, {
          visualizePathStyle: {
            fill: "transparent",
            stroke: "#fff",
            lineStyle: "dashed",
            strokeWidth: 0.15,
            opacity: 0.1,
          },
        });
        if (Game.rooms["E27N8"]) {
          if (
            Game.creeps[i].store.getUsedCapacity() == Game.creeps[i].store.getFreeCapacity() &&
            !Game.creeps[i].memory.isLoaded
          ) {
            Game.creeps[i].memory.isLoaded = true;
          } else if (
            Game.creeps[i].store.getUsedCapacity() == 0 &&
            Game.creeps[i].memory.isLoaded
          ) {
            Game.creeps[i].memory.isLoaded = false;
          } else if (
            Game.creeps[i].store.getUsedCapacity() < Game.creeps[i].store.getFreeCapacity() &&
            !Game.creeps[i].memory.isLoaded
          ) {
            if (
              Game.creeps[i].withdraw(
                depositTargets[0],
                RESOURCE_ENERGY,
                Game.creeps[i].store.getFreeCapacity()
              ) === ERR_NOT_IN_RANGE
            ) {
              Game.creeps[i].moveTo(depositTargets[0], {
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
                Game.rooms["E27N8"].room.controller
              ) === ERR_NOT_IN_RANGE
            ) {
              Game.creeps[i].moveTo(Game.rooms["E27N8"].room.controller, {
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
          Game.creeps[i].moveTo(Game.rooms["E27N8"].controller);
          Game.creeps[i].claimController(Game.rooms["E27N8"].controller);
        }
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
        Game.creeps[i].store.getUsedCapacity() === Game.creeps[i].store.getFreeCapacity() &&
        !Game.creeps[i].memory.isLoaded
      ) {
        Game.creeps[i].memory.isLoaded = true;
      } else if (
        Game.creeps[i].store.getUsedCapacity() === 0 &&
        Game.creeps[i].memory.isLoaded
      ) {
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
      } else if (Game.creeps[i].memory.isLoaded == true) {
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
        Game.spawns["Spawn1"].store.getUsedCapacity(RESOURCE_ENERGY) === 300
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
    }
    if (repairTargets.length > 0) {
      towers.forEach((tower) => tower.repair(repairTargets[0]));
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
  console.log("depositTargets: " + depositTargets);
  console.log("-----------------------End Report-----------------------");
};
