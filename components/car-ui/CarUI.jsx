"use client";

import LocalParkingIcon from '@mui/icons-material/LocalParking';
import BuildIcon from '@mui/icons-material/Build';
import Battery20Icon from '@mui/icons-material/Battery20';
import Battery50Icon from '@mui/icons-material/Battery50';
import Battery80Icon from '@mui/icons-material/Battery80';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import SystemSecurityUpdateWarningIcon from '@mui/icons-material/SystemSecurityUpdateWarning';
import SettingsIcon from '@mui/icons-material/Settings';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WidgetsIcon from '@mui/icons-material/Widgets';
import PowerIcon from '@mui/icons-material/Power';
import Slider from '@mui/material/Slider';
import GaugeComponent from 'react-gauge-component';
import { useState } from "react";
import { useRouter } from "next/navigation";
import ReplayIcon from '@mui/icons-material/Replay';

export default function CarUI(data) {
  const router = useRouter();
  let carData = data.data;
  const [parkingBreakOn, setParkingBreakOn] = useState(carData.parkingBreakOn);
  const [checkEngineOn, setCheckEngineOn] = useState(carData.checkEngineOn);
  const [motorHighSpeedOn, setMotorHighSpeedOn] = useState(carData.motorHighSpeedOn);
  const [powerInOut, setPowerInOut] = useState(carData.powerInOut);
  const [motorRPM, setMotorRPM] = useState(carData.motorRPM);
  let powerInOutTemp = carData.powerInOut;
  let motorRPMTemp = carData.motorRPM;
  const [batteryPercentage, setBatteryPercentage] = useState(carData.batteryPercentage);
  let batteryPercentageTemp = carData.batteryPercentage;
  const [batteryTemp, setBatteryTemp] = useState(carData.batteryTemp);
  const [gearRatio, setGearRatio] = useState(carData.gearRatio);
  const [motorSpeed, setMotorSpeed] = useState(carData.motorSpeed);
  let motorSpeedTemp;
  const [chargingOn, setChargingOn] = useState(carData.chargingOn);
  let chargingOnTemp;
  const [rpmInterval, setRPMInterval] = useState(null);
  const [powerInInterval, setPowerInInterval] = useState(null);
  const [powerOutInterval, setPowerOutInterval] = useState(null);
  //let powerOutIntervalTemp = [];
  //let powerOutInterval;

  const kW = (value) => {
    return value + ' kW';
  }

  const rpm = (value) => {
    return value + ' RPM';
  }
  
  const increaseDecreaseMotorSpeed = async(value) => {
    setMotorSpeed(value);
    motorSpeedTemp = value;
    motorRPMTemp = motorRPM;
    //batteryPercentageTemp = batteryPercentage;
    if(rpmInterval) {
        clearInterval(rpmInterval);
    }
    if(powerOutInterval) {
        clearInterval(powerOutInterval);
    }

    if(motorSpeedTemp > 0) {
        setRPMInterval(setInterval(increaseDecreaseRPM, 1000));
        setPowerOutInterval(setInterval(decreaseBattery, 1000));
    } else {
        setMotorRPM(0);
    }
    await updateCar({
        _id: carData._id,
        motorSpeed: motorSpeedTemp,
    });
  }

  const increaseDecreaseRPM = async() => {
    if((motorSpeedTemp == 1 && motorRPMTemp == 200) || (motorSpeedTemp == 2 && motorRPMTemp == 400)
        || (motorSpeedTemp == 3 && motorRPMTemp == 600) || (motorSpeedTemp == 4 && motorRPMTemp == 800)) {
        clearInterval(rpmInterval);
    } else if(motorSpeedTemp == 1 && motorRPMTemp < 200) {
        motorRPMTemp = motorRPMTemp + 20;
    } else if(motorSpeedTemp == 1 && motorRPMTemp > 200) {
        motorRPMTemp = motorRPMTemp - 20;
    } else if(motorSpeedTemp == 2 && motorRPMTemp < 400) {
        motorRPMTemp = motorRPMTemp + 20;
    } else if(motorSpeedTemp == 2 && motorRPMTemp > 400) {
        motorRPMTemp = motorRPMTemp - 20;
    } else if(motorSpeedTemp == 3 && motorRPMTemp < 600) {
        motorRPMTemp = motorRPMTemp + 20;
    } else if(motorSpeedTemp == 3 && motorRPMTemp > 600) {
        motorRPMTemp = motorRPMTemp - 20;
    } else if(motorSpeedTemp == 4 && motorRPMTemp < 800) {
        motorRPMTemp = motorRPMTemp + 20;
    }

    setMotorRPM(motorRPMTemp);
    await updateCar({
        _id: carData._id,
        motorRPM: motorRPMTemp,
    });
  }

  const toggleCharging = async() => {
    chargingOnTemp = !chargingOn;
    setChargingOn(chargingOnTemp);
    batteryPercentageTemp = batteryPercentage;
    if(powerInInterval) {
        clearInterval(powerInInterval);
    }
    
    if(chargingOnTemp) {
        setPowerInInterval(setInterval(increaseBattery, 1000));
    }
  }

  const increaseBattery = async() => {
    if(chargingOnTemp && batteryPercentageTemp < 100) {
        batteryPercentageTemp = batteryPercentageTemp + 1;
    }
    setBatteryPercentage(batteryPercentageTemp);
    await updateCar({
        _id: carData._id,
        batteryPercentage: batteryPercentageTemp,
    });
  }

  const decreaseBattery = async() => {
    if(motorSpeedTemp == 1) {
        batteryPercentageTemp = batteryPercentageTemp - 1;
    } else if(motorSpeedTemp == 2) {
        batteryPercentageTemp = batteryPercentageTemp - 2;
    } else if(motorSpeedTemp == 3) {
        batteryPercentageTemp = batteryPercentageTemp - 3;
    } else if(motorSpeedTemp == 4) {
        batteryPercentageTemp = batteryPercentageTemp - 4;
    }

    if(batteryPercentageTemp <= 0) {
        await setEmpty();
        return;
    }

    setBatteryPercentage(batteryPercentageTemp);
    await updateCar({
        _id: carData._id,
        batteryPercentage: batteryPercentageTemp
    });
  }

  const setEmpty = async() => {
    clearInterval(powerOutInterval);
    clearInterval(rpmInterval);
    setMotorSpeed(0);
    setMotorRPM(0);
    setBatteryPercentage(0);
    await updateCar({
        _id: carData._id,
        motorSpeed: 0,
        motorRPM: 0,
        batteryPercentage: 0
    });
  }

  const updateCar = async(body) => {
    try {
        let url = process.env.NEXT_PUBLIC_URL + "/api/car";
        const res = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        return res;
    } catch (error) {
        return error;
    }
  }

  return (
    <div className="main-container">
      <div className="car-ui-container">
        <div className="top-container">
          <div className={parkingBreakOn? "parking indicator enabled": "parking indicator"}><LocalParkingIcon/></div>
          <div className={checkEngineOn? "check-engine indicator enabled": "check-engine indicator"}><BuildIcon/></div>
          <div className={motorHighSpeedOn? "motor-status indicator enabled": "motor-status indicator"}><SystemSecurityUpdateWarningIcon/></div>
          <div className={batteryPercentage <= 20 ? "battery-low indicator enabled": "battery-low indicator"}><Battery20Icon/></div>
        </div>
        <div className="guages-container">
          <GaugeComponent
            arc={{
              nbSubArcs: 150,
              colorArray: ['#5BE12C', '#F5CD19', '#EA4228'],
              width: 0.3,
              padding: 0.003
            }}
            labels={{
              valueLabel: {
                style: {fontSize: 40},
                formatTextValue: kW
              },
              tickLabels: {
                type: "outer",
                ticks: [
                  { value: -1000 },
                  { value: -750 },
                  { value: -500 },
                  { value: -250},
                  { value: 0 },
                  { value: 250 },
                  { value: 500 },
                  { value: 750 },
                  { value: 1000 },
                ],
                defaultTickValueConfig: {
                  formatTextValue: kW
                }
              }
            }}
            value={powerInOut}
            minValue={-1000}
            maxValue={1000}
          />
          <GaugeComponent
            arc={{
              nbSubArcs: 150,
              colorArray: ['#5BE12C', '#F5CD19', '#EA4228'],
              width: 0.3,
              padding: 0.003
            }}
            labels={{
              valueLabel: {
                style: {fontSize: 40},
                formatTextValue: rpm
              },
              tickLabels: {
                type: "outer",
                ticks: [
                  { value: 0 },
                  { value: 100 },
                  { value: 200 },
                  { value: 300},
                  { value: 400 },
                  { value: 500 },
                  { value: 600 },
                  { value: 700 },
                  { value: 800 },
                ],
                defaultTickValueConfig: {
                  formatTextValue: rpm
                }
              }
            }}
            value={motorRPM}
            maxValue={800}
          />
        </div>
        <div className="middle-container">
          <div className="gear-ratio meter">
            <SettingsIcon/>
            {gearRatio}
          </div>
          <div className="battery meter">
            {batteryPercentage < 50 && (<Battery20Icon/>)}
            {(batteryPercentage >= 50 && batteryPercentage < 75) && (<Battery50Icon/>)}
            {(batteryPercentage >= 75 && batteryPercentage < 100) && (<Battery80Icon/>)}
            {batteryPercentage == 100 && (<BatteryFullIcon/>)}
            {batteryPercentage}
          </div>
          <div className="thermostat meter">
            <ThermostatIcon/>
            {batteryTemp}
          </div>
          <div className="battery-temp meter">
            <SystemSecurityUpdateWarningIcon/>
            {motorRPM}
          </div>
          <div className="motor-speed meter">
            <Slider value={motorSpeed} step={1} marks min={0} max={4} onChange={(e) => increaseDecreaseMotorSpeed(e.target.value)}/>
            {motorSpeed == 0? "OFF" : motorSpeed}
          </div>
        </div>
        <div className="bottom-container">
          <div className="gear-motor-temp btn">
            <SettingsIcon/>
            <SystemSecurityUpdateWarningIcon/>
            <ThermostatIcon/>
          </div>
          <div className="view-menu btn"><WidgetsIcon/></div>
          <div className={chargingOn? "charge enabled btn": "charge btn"} onClick={toggleCharging}><PowerIcon/></div>
        </div>
      </div>
    </div>
  );
}