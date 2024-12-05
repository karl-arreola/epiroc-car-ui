"use client";

import LocalParkingIcon from '@mui/icons-material/LocalParking';
import BuildIcon from '@mui/icons-material/Build';
import Battery20Icon from '@mui/icons-material/Battery20';
import SystemSecurityUpdateWarningIcon from '@mui/icons-material/SystemSecurityUpdateWarning';
import SettingsIcon from '@mui/icons-material/Settings';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WidgetsIcon from '@mui/icons-material/Widgets';
import PowerIcon from '@mui/icons-material/Power';
import Slider from '@mui/material/Slider';
import GaugeComponent from 'react-gauge-component';

export default function Home() {
  const kW = (value) => {
    return value + ' kW';
  }

  const rpm = (value) => {
    return value + ' RPM';
  }

  return (
    <div className="main-container">
      <div className="car-ui-container">
        <div className="top-container">
          <div className="parking indicator"><LocalParkingIcon/></div>
          <div className="check-engine indicator"><BuildIcon/></div>
          <div className="motor-status indicator"><SystemSecurityUpdateWarningIcon/></div>
          <div className="battery-low indicator"><Battery20Icon/></div>
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
            value={0}
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
            value={0}
            maxValue={800}
          />
        </div>
        <div className="middle-container">
          <div className="gear-ratio meter"><SettingsIcon/></div>
          <div className="battery meter"><Battery20Icon/></div>
          <div className="thermostat meter"><ThermostatIcon/></div>
          <div className="battery-temp meter"><SystemSecurityUpdateWarningIcon/></div>
          <div className="motor-speed meter">
            <Slider defaultValue={0} step={1} marks min={0} max={4}/>
          </div>
        </div>
        <div className="bottom-container">
          <div className="gear-motor-temp btn">
            <SettingsIcon/>
            <SystemSecurityUpdateWarningIcon/>
            <ThermostatIcon/>
          </div>
          <div className="view-menu btn"><WidgetsIcon/></div>
          <div className="charge btn"><PowerIcon/></div>
        </div>
      </div>
    </div>
  );
}
