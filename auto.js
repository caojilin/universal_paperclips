clearInterval(stage1);
clearInterval(stage2);

const can_run_forever = setInterval(() => {
  //quantum computing
  const values = qChips.map((qChip, index) => qChip.value);
  let accumulation = 0;
  for (let i = 0; i < values.length; i++) {
    accumulation += values[i];
  }
  if (accumulation > 0) {
    document.getElementById("btnQcompute").click();
  }

  //strategic modeling
  if (operations > tourneyCost && tourneyInProg == 0) {
    document.getElementById("btnNewTournament").click();
    document.getElementById("btnRunTournament").click();
  }
}, 1);

const stage1 = setInterval(() => {
  //make papaerclip
  document.getElementById("btnMakePaperclip").click();

  //buy wire
  if (funds > wireCost && wire < 100) {
    document.getElementById("btnBuyWire").click();
  }
}, 1);

const stage2 = setInterval(() => {
  // Drone and Solar Farm phase
  let factoryCount = parseInt(
    document.getElementById("factoryLevelDisplay").textContent.replace(/,/g, "")
  );
  let canMakeFactory = !document.getElementById("btnMakeFactory").disabled;
  let harvesterDroneCount = parseInt(
    document
      .getElementById("harvesterLevelDisplay")
      .textContent.replace(/,/g, "")
  );
  let canMakeHarvesterDrone =
    !document.getElementById("btnMakeHarvester").disabled;
  let canMakeHarvesterDrone1k =
    !document.getElementById("btnHarvesterx1000").disabled;
  let wireDroneCount = parseInt(
    document
      .getElementById("wireDroneLevelDisplay")
      .textContent.replace(/,/g, "")
  );
  let canMakeWireDrone = !document.getElementById("btnMakeWireDrone").disabled;
  let canMakeWireDrone1k =
    !document.getElementById("btnWireDronex1000").disabled;
  let solarFarmCount = parseInt(
    document.getElementById("farmLevel").textContent.replace(/,/g, "")
  );
  let canMakeSolarFarm = !document.getElementById("btnMakeFarm").disabled;
  let batteryTowerCount = parseInt(
    document.getElementById("batteryLevel").textContent.replace(/,/g, "")
  );
  let canMakeBatteryTower = !document.getElementById("btnMakeBattery").disabled;
  let hasAvailableMatter =
    parseFloat(
      document
        .getElementById("availableMatterDisplay")
        .textContent.replace(/,/g, "")
    ) > 0;
  let hasAcquiredMatter =
    parseFloat(
      document
        .getElementById("acquiredMatterDisplay")
        .textContent.replace(/,/g, "")
    ) > 0;
  let hasWire =
    parseFloat(
      document.getElementById("nanoWire").textContent.replace(/,/g, "")
    ) > 0;

  let projButton_selfCorrectingSupplyChain =
    document.getElementById("projectButton102");
  let selfCorrectingSupplyChainVisible =
    projButton_selfCorrectingSupplyChain &&
    projButton_selfCorrectingSupplyChain.style.visibility == "visible";

  let handler_makeFactory = makeFactory;
  let handler_makeHarvesterDrone = function () {
    makeHarvester(1);
  };
  let handler_makeHarvesterDrone1k = function () {
    makeHarvester(1000);
  };
  let handler_makeWireDrone = function () {
    makeWireDrone(1);
  };
  let handler_makeWireDrone1k = function () {
    makeWireDrone(1000);
  };
  let handler_makeSolarFarm = function () {
    makeFarm(1);
  };
  let handler_makeBatteryTower = function () {
    makeBattery(1);
  };

  if (
    factoryCount >= 59 &&
    solarFarmCount > 3538 &&
    selfCorrectingSupplyChainVisible
  ) {
    // Pause consuming clips so we can activate selfCorrectingSupplyChain
  } else if (hasAvailableMatter || hasAcquiredMatter) {
    // Based on a speed run: https://www.youtube.com/watch?v=hDXoonknjS0
    // Values to achieve:
    // [factory, harvester, wire, farm, battery]
    let milestones = [
      [1, 30, 30, 11, 1],
      [6, 170, 180, 34, 11],
      [6, 320, 370, 49, 11],
      [8, 400, 490, 60, 21],
      [9, 510, 610, 68, 21],
      [10, 1000, 1400, 168, 21],
      [15, 2000, 2800, 248, 121],
      [20, 2500, 3300, 308, 121],
      [50, 5500, 6600, 600, 121],
      [57, 35500, 36000, 2208, 121],
      [70, 77000, 77000, 5508, 1221],
      [80, 87000, 87000, 7508, 1221],
      [198, 377000, 404000, 29508, 1221],
      [211, 1121000, 1133000, 50308, 1221],
      [1000, 1133000, 1135000, 50308, 1221],
    ];

    let currVals = [
      factoryCount,
      harvesterDroneCount,
      wireDroneCount,
      solarFarmCount,
      batteryTowerCount,
    ];

    for (let milestone of milestones) {
      var done = false;
      for (let i = 0; i < currVals.length; i++) {
        let delta = milestone[i] - currVals[i];
        if (delta > 0) {
          if (i == 0 && canMakeFactory) {
            handler_makeFactory();
          } else if (i == 1 && canMakeHarvesterDrone) {
            if (hasAvailableMatter) {
              if (canMakeHarvesterDrone1k && delta >= 1000) {
                handler_makeHarvesterDrone1k();
              } else {
                handler_makeHarvesterDrone();
              }
            }
          } else if (i == 2 && canMakeWireDrone) {
            if (hasAcquiredMatter) {
              if (canMakeWireDrone1k && delta >= 1000) {
                handler_makeWireDrone1k();
              } else {
                handler_makeWireDrone();
              }
            }
          } else if (i == 3 && canMakeSolarFarm) {
            handler_makeSolarFarm();
          } else if (i == 4 && canMakeBatteryTower) {
            handler_makeBatteryTower();
          }

          // Don't break so we can increment evenly across the types that need it
          done = true;
        }
      }

      if (done) {
        break;
      }
    }
  }
}, 1);

// const auto_swarm_compute = setInterval(() => {
//     let hasSpaceExploration = document.getElementById("spaceDiv").style.display != "none"

//     // Swarm computing
//     let hasSwarmComputing = document.getElementById("swarmEngine").style.display != "none"

//     if (hasSwarmComputing) {
//         let totalDroneCount = harvesterDroneCount + wireDroneCount
//         let swarmComputingSlider = document.getElementById("slider")

//         var sliderValue = 0 // range is 0 to 200
//         if (hasSpaceExploration) {
//             sliderValue = processors > 1400 ? 0 : 150
//         } else {
//             // Heuristic for when we're still on Earth (prior to space exploration)
//             if (!hasAvailableMatter && !hasAcquiredMatter) {
//                 sliderValue = 200
//             } else if (processors > 160) {
//                 sliderValue = 0
//             } else if (totalDroneCount > 1000) {
//                 sliderValue = 150
//             } else if (totalDroneCount > 700) {
//                 sliderValue = 100
//             }
//         }

//         swarmComputingSlider.value = sliderValue

//         let entertainSwarmButton = document.getElementById("btnEntertainSwarm")
//         let swarmIsBored = document.getElementById("swarmStatus").textContent == "Bored"

//         let synchronizeSwarmButton = document.getElementById("btnSynchSwarm")
//         let swarmIsDisorganized = document.getElementById("swarmStatus").textContent == "Disorganized"

//         if (entertainSwarmButton && !entertainSwarmButton.disabled && swarmIsBored) {
//             entertainSwarmButton.click()
//         } else if (synchronizeSwarmButton && !synchronizeSwarmButton.disabled && swarmIsDisorganized) {
//             synchronizeSwarmButton.click()
//         }
//     }
// }, 1);
